import express from 'express';
import { createPrismaClient } from '../repository/prisma';
import { expensesRouter } from './expensesRouter';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';

const PORT = process.env.PORT || 3001;
const app = express();

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error('ACCESS TOKEN SECRET no existe');
}

const access_token_secret: string = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret: string = process.env.REFRESH_TOKEN_SECRET;

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/spent', expensesRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  createPrismaClient();
  console.log('Server running on port 3001');
});
