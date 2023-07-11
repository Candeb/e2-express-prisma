import { Router } from 'express';
import * as controllers from './controllers';

export const userRouter = Router();

// userRouter.post('/new', controllers.createUserController);
// userRouter.get('/all', controllers.getAllUsersController);
// userRouter.delete('/:id', controllers.deleteUserController);

userRouter.get('/expenses/:userId', controllers.getExpensesUserIdController);
