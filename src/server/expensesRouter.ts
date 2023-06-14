import { Router } from 'express';
import * as controllers from './controllers';

export const expensesRouter = Router();

expensesRouter.post('/', controllers.createSpentController);
expensesRouter.get('/:id', controllers.getSpentByIdController);
