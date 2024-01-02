// src/auth.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

interface User {
  id: number;
  email: string;
  role: string | null;
}

export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Invalid email or password
      return null;
    }
  
    // Successful login, generate JWT token
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
  
    return { user, token };
  }


const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}