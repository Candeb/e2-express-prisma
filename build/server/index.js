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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expensesRouter_1 = require("./expensesRouter");
const prisma_1 = require("../repository/prisma");
const userRouter_1 = require("./userRouter");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS TOKEN SECRET no existe');
}
const secret = process.env.ACCESS_TOKEN_SECRET;
app.use(express_1.default.json());
// register
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hash = yield bcrypt_1.default.hash(password, 10);
    try {
        const user = yield (0, prisma_1.prisma)().users.create({
            data: {
                name: name,
                email: email,
                password: hash,
            },
        });
        res.json(user);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
// login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, prisma_1.prisma)().users.findUnique({ where: { email: email } });
        if (user === null) {
            throw new Error('User not found');
        }
        const result = yield bcrypt_1.default.compare(password, user.password);
        const accessToken = jsonwebtoken_1.default.sign({ email: email, role: 'ADMIN' }, secret, {
            expiresIn: 60 * 60,
        });
        res.json({ access_Token: accessToken });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
// usuarios logueados
app.get('/', (req, res) => {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: 'No autorizado: token no presente' });
        return;
    }
    const token = header.split(' ')[1];
    try {
        const data = jsonwebtoken_1.default.verify(token, secret);
        if (data) {
            const name = data.user;
            const role = data.role;
            if (role === 'ADMIN') {
                res.json({ message: `¡Hola ADMIN ${name}!` });
                return;
            }
            else {
                res.json({
                    message: '¡Hola ' +
                        ` ${name},` +
                        ' te damos la bienvenida a tu app de gastos!',
                });
            }
            // res.status(403).json({ message: 'Not admin' });
            // return;
        }
    }
    catch (err) {
        res.status(401).json({
            message: 'No autorizado: token inválido',
        });
        return;
    }
    res.status(401).json({
        message: 'No autorizado: token inválido',
    });
});
app.use('/api/spent', expensesRouter_1.expensesRouter);
app.use('/api/user', userRouter_1.userRouter);
app.listen(PORT, () => {
    (0, prisma_1.createPrismaClient)();
    console.log('Server running on port 3000');
});
