"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpensesUserIdController = exports.deleteUserController = exports.getAllUsersController = exports.deleteSpentController = exports.getSpentByIdController = exports.createSpentController = void 0;
const createSpent_1 = require("../bussiness-logic/expenses/createSpent");
const getSpent_1 = require("../bussiness-logic/expenses/getSpent");
// import { createUser } from '../bussiness-logic/users/createUser';
const getUsers_1 = require("../bussiness-logic/users/getUsers");
const deleteUser_1 = require("../bussiness-logic/users/deleteUser");
const deleteSpent_1 = require("../bussiness-logic/expenses/deleteSpent");
const getExpensesForUserId_1 = require("../bussiness-logic/expenses/getExpensesForUserId");
// expenses
const createSpentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSpentInput = req.body;
        const result = yield (0, createSpent_1.createSpent)(newSpentInput);
        res.send(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createSpentController = createSpentController;
const getSpentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, getSpent_1.getSpentById)(id);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `Gasto: ${id} no encontrado` });
        return;
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getSpentByIdController = getSpentByIdController;
const deleteSpentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, deleteSpent_1.deleteSpent)(id);
        res.send(`Gasto eliminado con éxito`);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteSpentController = deleteSpentController;
// users
// export const createUserController = async (req: Request, res: Response) => {
//   try {
//     const userInput = req.body;
//     const result = await createUser(userInput, res);
//     res.json(result);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getAllUsersController = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, getUsers_1.getAllUsers)();
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllUsersController = getAllUsersController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, deleteUser_1.deleteUser)(id);
        res.send('Usuario eliminado con éxito');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserController = deleteUserController;
// expenses + user
const getExpensesUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield (0, getExpensesForUserId_1.getExpensesForUserId)(userId);
        console.log(result);
        res.send(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getExpensesUserIdController = getExpensesUserIdController;
