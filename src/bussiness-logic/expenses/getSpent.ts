import { Expenses, PrismaClient } from '@prisma/client';
import { prisma } from '../../repository/prisma';
import { Spent } from '../types/spent';

export async function getSpentById(spentId: string): Promise<Spent | null> {
  try {
    const db = prisma();
    const spent = await db.expenses.findUnique({
      where: {
        id: spentId,
      },
    });
    return spent;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
