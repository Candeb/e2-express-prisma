import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function deleteUser(id: string) {
  try {
    await db.users.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
