import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../repository/prisma';
import { User } from '../bussiness-logic/types/user';
import { Users } from '@prisma/client';

const access_token_secret = 'vdrgv';

const refresh_token_secret = 'serff';

export type loginResponse = { accessToken: string; refreshToken: string };

export const login = async (
  email: string,
  password: string
): Promise<loginResponse> => {
  try {
    const user = await prisma().users.findUnique({
      where: { email: email },
    });
    if (user === null) {
      throw new Error('Usuario no encontrado');
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const accessToken = jwt.sign(
        { email: email, role: 'CLIENT' },
        access_token_secret,
        {
          expiresIn: 60 * 60,
        }
      );
      const refreshToken = jwt.sign({ email: email }, refresh_token_secret, {
        expiresIn: 60 * 60 * 72,
      });

      return { accessToken: accessToken, refreshToken: refreshToken };
    }
    throw new Error('Invalid password');
  } catch (err) {
    throw err;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  const hash = await bcrypt.hash(password, 10);

  try {
    const user: any = await prisma().users.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

export const refreshToken = async (token: string): Promise<loginResponse> => {
  try {
    const data = jwt.verify(token, refresh_token_secret);
    if (data) {
      const dataparsed = data as unknown as Users;

      const user = await prisma().users.findUnique({
        where: {
          email: dataparsed.email,
        },
      });
      if (user === null) {
        throw new Error('Usuario no encontrado');
      }
      const accessToken = jwt.sign(
        { email: user.email, role: 'CLIENT' },
        access_token_secret,
        {
          expiresIn: 60 * 60,
        }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        refresh_token_secret,
        {
          expiresIn: 60 * 60 * 72,
        }
      );
      return { accessToken: accessToken, refreshToken: refreshToken };
    }
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new Error('No autorizado: el token expiró');
    }
    throw new Error('No autorizado: el token no es valido');
  }
  throw new Error('No autorizado: el token no es valido');
};
