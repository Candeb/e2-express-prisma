import { Request, Response, NextFunction } from 'express';
import { prisma } from '../repository/prisma';
import { createSpent } from '../bussiness-logic/createSpent';
import { getSpentById } from '../bussiness-logic/getSpent';

export const createSpentController = async (req: Request, res: Response) => {
  try {
    const newSpentInput = req.body;

    const result = await createSpent(newSpentInput);
    res.send(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSpentByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getSpentById(id);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({ message: `Product: ${id} not found` });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
