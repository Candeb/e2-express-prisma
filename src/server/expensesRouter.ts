import { Router } from 'express';
import * as controllers from './controllers';
import { authMiddleware } from './middlewares/authMiddleware';
import { query, body } from 'express-validator';
import { createItemValidator as validator } from './validators/validators';

export const expensesRouter = Router();

expensesRouter.get('/id/:id', controllers.getSpentByIdController);

expensesRouter.use(authMiddleware); // middleware de login

expensesRouter.post(
  '/new',
  body('name').isString().notEmpty(),
  body('amount').isNumeric().notEmpty(),
  body('userId').isString().notEmpty(),
  validator,
  controllers.createSpentController
);

expensesRouter.delete(
  '/delete/:id',
  authMiddleware,

  controllers.deleteSpentController
);
