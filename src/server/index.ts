import express from 'express';
import { expensesRouter } from './expensesRouter';
import { createPrismaClient } from '../repository/prisma';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Bienvenido a tu app de gastos' });
});

app.use('/api/spent', expensesRouter);

app.listen(PORT, () => {
  createPrismaClient();
  console.log('Server running on port 3000');
});
