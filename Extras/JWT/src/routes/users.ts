// src/routes/users.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateJWT, authorizeRole } from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/limited-access",
  authenticateJWT,
  authorizeRole(["USER"]),
  (req, res) => {
    res.json({ message: "Standard user has limited access" });
  }
);

router.get(
  "/user/reclamations",
  authenticateJWT,
  authorizeRole(["USER"]),
  async (req, res) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      include: {
        reclamations: true,
      },
    });
    console.log(user);
    res.json(user?.reclamations);
  }
);

router.post(
  "/user/reclamations",
  authenticateJWT,
  authorizeRole(["USER"]),
  async (req, res) => {
    try {
        const { sujet, description } = req.body;
        const result = await prisma.reclamation.create({
          data: {
            description: description,
            sujet: sujet,
            etat: "EN COURS",
            userId: req.user.userId,
          },
        });
        res.json(result);
    } catch (error){
        res.status(500).json({ error: error });
    }

  }
);

router.get(
  "/full-access",
  authenticateJWT,
  authorizeRole(["MANAGER"]),
  (req, res) => {
    res.json({ message: "Manager has full access" });
  }
);

export default router;
