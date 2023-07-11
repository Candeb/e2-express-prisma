import express from 'express';
import { expensesRouter } from './expensesRouter';
import { createPrismaClient, prisma } from '../repository/prisma';
import { userRouter } from './userRouter';
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { authRouter } from './authRouter';

const PORT = process.env.PORT || 3000;
const app = express();
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error('ACCESS TOKEN SECRET no existe');
}
const access_token_secret: string = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret: string = process.env.REFRESH_TOKEN_SECRET;

app.use(express.json());

// usuarios logueados

app.get('/', (req: express.Request, res: Response) => {
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
      if (role === 'ADMIN') {
        res.json({ message: `¡Hola ADMIN ${email}!` });
        return;
      } else if (role === 'CLIENT') {
        res.json({
          message:
            '¡Hola ' +
            ` ${email},` +
            ' te damos la bienvenida a tu app de gastos!',
        });
      }
      return;
    }
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json('No autorizado: el token expiró');
    }
    res.status(401).json('No autorizado: el token no es valido');
  }
  res.status(401).json('No autorizado: el token no es valido');
});

app.use('/api/auth', authRouter);
app.use('/api/spent', expensesRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  createPrismaClient();
  console.log('Server running on port 3000');
});
