// src/routes/auth.ts
import express from 'express';
import { PrismaClient } from "@prisma/client";
import { hashPassword, loginUser } from '../auth';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  if (!result) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const { user, token } = result;

  res.json({ user, token });
});

router.post(`/signup`, async (req, res) => {
    try {
      const { nom, email, prenom, tel, password } = req.body;
  
      const hashedPassword = await hashPassword(password);
  
      const result = await prisma.user.create({
        data: {
          nom,
          prenom,
          email,
          tel,
          password : hashedPassword,
          role: "USER",
        },
      });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });

export default router;
