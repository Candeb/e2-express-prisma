import { Router } from 'express';
import * as controllers from './controllers';
import { authMiddleware } from './middlewares/authMiddleware';

export const userRouter = Router();

userRouter.get('/expenses/:userId', controllers.getExpensesUserIdController);

userRouter.delete('/:id', authMiddleware, controllers.deleteUserController);
