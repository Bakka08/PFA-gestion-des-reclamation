// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: number;
  role: string;
}

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //  console.log(req.header("Authorization")?.split(" ")[1], 'req header');
  //  console.log(process.env.JWT_SECRET, 'secret');
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err, decoded) => {
      if (err) {
        // console.log(err, 'err');
        return res.status(401).json({ message: "Token is not valid" });
      }

      const decodedToken = decoded as DecodedToken;
      req.user = decodedToken;
      next();
    }
  );
}

export function authorizeRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user as DecodedToken;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
