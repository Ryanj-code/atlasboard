import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY!;
const REFRESH_SECRET = process.env.REFRESH_SECRET_KEY!;

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyRefreshToken(token: string): { userId: string } {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { userId: string };
  } catch {
    throw new Error("Invalid refresh token");
  }
}

export function verifyAccessToken(token: string): { userId: string } {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (err: any) {
    if (err.name === "TokenExpiredError") throw new Error("Access token expired");
    throw new Error("Invalid access token");
  }
}
