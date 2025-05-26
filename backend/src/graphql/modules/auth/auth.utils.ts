import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY!;
const REFRESH_SECRET = process.env.REFRESH_SECRET_KEY!;

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { userId: string };
  } catch {
    throw new Error("Invalid refresh token");
  }
};
