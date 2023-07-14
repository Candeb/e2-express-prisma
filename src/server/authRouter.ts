import { Router } from 'express';
import * as controllers from './controllers';
import { body } from 'express-validator';
import { createItemValidator as validator } from './validators/validators';

export const authRouter = Router();

// register
authRouter.post(
  '/register',
  body('name').isString().notEmpty(),
  body('email').isString().notEmpty(),
  body('password').isString().notEmpty(),
  validator,
  controllers.registerController
);

// login
authRouter.post(
  '/login',
  body('email').isString().notEmpty(),
  body('password').isString().notEmpty(),
  validator,
  controllers.loginController
);

// refresh
authRouter.post('/refresh', controllers.refreshController);
