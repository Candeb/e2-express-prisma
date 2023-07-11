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
exports.prisma = exports.createPrismaClient = void 0;
const client_1 = require("@prisma/client");
let prismaClient;
function createPrismaClient() {
    prismaClient = new client_1.PrismaClient();
    prismaClient.$use((params, next) => __awaiter(this, void 0, void 0, function* () {
        if (params.action == 'delete') {
            params.action = 'update';
            params.args['data'] = { deleted_at: new Date() };
        }
        return next(params);
    }));
    return prismaClient;
}
exports.createPrismaClient = createPrismaClient;
function prisma() {
    if (!prismaClient) {
        prismaClient = createPrismaClient();
    }
    return prismaClient;
}
exports.prisma = prisma;
