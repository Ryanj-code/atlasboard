import { PrismaClient } from "../prisma/generated";
import { Request } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: string | null;
}

export const createContext = (req?: Request): Context => {
  const authHeader = req?.headers.authorization;
  let userId: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      userId = (decoded as any).userId;
    } catch (err) {
      if (err instanceof Error) {
        console.warn("JWT verification failed:", err.message);
      } else {
        console.warn("JWT verification failed with non-standard error");
      }
    }
  }

  return { prisma, userId };
};
