import { Request, Response } from 'express';
import { prisma } from '../repository/prisma';
import { createSpent } from '../bussiness-logic/expenses/createSpent';
import { getSpentById } from '../bussiness-logic/expenses/getSpent';
// import { createUser } from '../bussiness-logic/users/createUser';
import { getAllUsers } from '../bussiness-logic/users/getUsers';
import { deleteUser } from '../bussiness-logic/users/deleteUser';
import { deleteSpent } from '../bussiness-logic/expenses/deleteSpent';
import { getExpensesForUserId } from '../bussiness-logic/expenses/getExpensesForUserId';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '@prisma/client';
import { login, refreshToken, register } from '../auth-logic/auth';

// expenses

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
    res.status(404).json({ message: `Gasto: ${id} no encontrado` });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSpentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteSpent(id);
    res.send(`Gasto eliminado con éxito`);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// expenses + user

export const getExpensesUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const result = await getExpensesForUserId(userId);
    console.log(result);
    res.send(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// users

export const getAllUsersController = async (res: Response) => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.send('Usuario eliminado con éxito');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const result = await register(name, email, password);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await login(email, password);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};
export const refreshController = async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  if (!header) {
    res
      .status(401)
      .json({ message: 'No autorizado: el token no está presente' });
    return;
  }
  const token = header.split(' ')[1];

  try {
    const result = await refreshToken(token);
    res.json(result);
    return;
  } catch (error) {
    res.status(500);
    return;
  }
};
