import { Router } from 'express';
import express from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../repository/prisma';
import { Response, Request } from 'express';
import { body } from 'express-validator';
import * as controllers from './controllers';

export const authRouter = Router();

// authRouter.post(
//   '/login',
//   body('email').isString().notEmpty(),
//   body('password').isString().optional(),
//   validator
// );

// // register
authRouter.post('/register', controllers.registerController);

// login
authRouter.post('/login', controllers.loginController);

// refresh
authRouter.post('/refresh', controllers.refreshController);
