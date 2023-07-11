import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function getExpensesForUserId(userId: string) {
  try {
    const expensesForUserId = await db.users.findMany({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        expenses: {
          select: {
            amount: true,
            name: true,
            userId: true,
          },
        },
      },
    });
    return expensesForUserId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
