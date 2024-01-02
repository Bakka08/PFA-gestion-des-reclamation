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
// src/routes/users.ts
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/limited-access", auth_1.authenticateJWT, (0, auth_1.authorizeRole)(["USER"]), (req, res) => {
    res.json({ message: "Standard user has limited access" });
});
router.get("/user/reclamations", auth_1.authenticateJWT, (0, auth_1.authorizeRole)(["USER"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: req.user.userId,
        },
        include: {
            reclamations: true,
        },
    });
    console.log(user);
    res.json(user === null || user === void 0 ? void 0 : user.reclamations);
}));
router.post("/user/reclamations", auth_1.authenticateJWT, (0, auth_1.authorizeRole)(["USER"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sujet, description } = req.body;
        const result = yield prisma.reclamation.create({
            data: {
                description: description,
                sujet: sujet,
                etat: "EN COURS",
                userId: req.user.userId,
            },
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
router.get("/full-access", auth_1.authenticateJWT, (0, auth_1.authorizeRole)(["MANAGER"]), (req, res) => {
    res.json({ message: "Manager has full access" });
});
exports.default = router;
