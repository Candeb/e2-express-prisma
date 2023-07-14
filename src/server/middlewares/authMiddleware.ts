import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const access_token_secret = process.env.ACCESS_TOKEN_SECRET ?? '';
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET ?? '';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: 'No autorizado: token no presente' });
    return;
  }
  const token = header.split(' ')[1];
  try {
    const data = jwt.verify(token, access_token_secret);
    if (data) {
      const email = (data as any).email;
      const role = (data as any).role;

      next();

      return;
    }
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json('No autorizado: el token expiró');
    }
    res.status(401).json('No autorizado: el token no es valido');
  }
  res.status(401).json('No autorizado: el token no es valido');
};
