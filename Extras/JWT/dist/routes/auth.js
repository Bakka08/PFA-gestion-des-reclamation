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
// src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../auth");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield (0, auth_1.loginUser)(email, password);
    if (!result) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const { user, token } = result;
    res.json({ user, token });
}));
router.post(`/signup`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, email, prenom, tel, password } = req.body;
        const hashedPassword = yield (0, auth_1.hashPassword)(password);
        const result = yield prisma.user.create({
            data: {
                nom,
                prenom,
                email,
                tel,
                password: hashedPassword,
                role: "USER",
            },
        });
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}));
exports.default = router;
