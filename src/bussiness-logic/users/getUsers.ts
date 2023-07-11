import { PrismaClient, Users } from '@prisma/client';

const db = new PrismaClient();

export async function getAllUsers(): Promise<Users[]> {
  try {
    const arrayUsers = db.users.findMany();
    return arrayUsers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
