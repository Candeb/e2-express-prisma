import { PrismaClient, Users } from '@prisma/client';

const db = new PrismaClient();

export async function getAllUsers(): Promise<Users[]> {
  try {
    const allUsers = db.users.findMany();
    return allUsers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
