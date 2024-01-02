// src/app.ts
import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { hashPassword } from "./auth";
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
// var authRoutes = require('./routes/auth');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', userRoutes);

// app.get("/api/users", async (req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();
//     // const users = await db('users').select();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});