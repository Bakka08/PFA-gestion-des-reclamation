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
exports.comparePasswords = exports.hashPassword = exports.loginUser = exports.generateToken = void 0;
// src/auth.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}
exports.generateToken = generateToken;
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            // Invalid email or password
            return null;
        }
        // Successful login, generate JWT token
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        return { user, token };
    });
}
exports.loginUser = loginUser;
const saltRounds = 10;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.hash(password, saltRounds);
    });
}
exports.hashPassword = hashPassword;
function comparePasswords(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(password, hashedPassword);
    });
}
exports.comparePasswords = comparePasswords;
