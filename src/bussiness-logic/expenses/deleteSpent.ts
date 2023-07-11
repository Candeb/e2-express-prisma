import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function deleteSpent(id: string) {
  try {
    await db.expenses.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
