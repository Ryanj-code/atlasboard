import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY!;

export interface Context {
  prisma: PrismaClient;
  userId?: string | null;
}

type RequestLike = {
  headers?: {
    authorization?: string;
  };
};

export function createContext(req?: RequestLike): Context {
  const authHeader = req?.headers?.authorization;
  let userId: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
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
}
