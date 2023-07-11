"use strict";
// import { Response } from 'express';
// import { PrismaClient, Users } from '@prisma/client';
// const db = new PrismaClient();
// export async function createUser(
//   userInput: Users,
//   res: Response
// ): Promise<any> {
//   const existingUser = await db.users.findUnique({
//     where: { email: userInput.email },
//   });
//   if (existingUser) {
//     throw new Error(
//       'Ya existe un usuario con el email ingresado. Intente con otro'
//     );
//   } else {
//     try {
//       const result = await db.users.create({
//         data: {
//           name: userInput.name,
//           email: userInput.email,
//           // password: userInput.password,
//         },
//       });
//       console.log(result);
//       res.send('Usuario creado con éxito');
//     } catch (error: any) {
//       console.log(error);
//       throw error;
//     }
//   }
// }
