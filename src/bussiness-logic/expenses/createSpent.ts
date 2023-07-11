import { Spent } from '../types/spent';
import { prisma } from '../../repository/prisma';

export async function createSpent(spent: Spent): Promise<Spent> {
  try {
    const db = prisma();
    const createdSpent = await db.expenses.create({
      data: {
        name: spent.name,
        amount: spent.amount,
        userId: spent.userId,
      },
    });
    console.log(createdSpent);

    return createdSpent;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
