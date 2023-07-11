import { Router } from 'express';
import * as controllers from './controllers';

export const expensesRouter = Router();

expensesRouter.post('/new', controllers.createSpentController);
expensesRouter.get('/id/:id', controllers.getSpentByIdController);
expensesRouter.delete('/delete/:id', controllers.deleteSpentController);
