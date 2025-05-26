import bcrypt from "bcrypt";
import { PrismaClient } from "../../../../prisma/generated";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./auth.utils";

const prisma = new PrismaClient();

export async function signup(
  _: any,
  {
    email,
    username,
    password,
  }: { email: string; username: string; password: string }
) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, username, password: hashedPassword },
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.session.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken, user };
}

export async function login(
  _: any,
  { email, password }: { email: string; password: string }
) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.session.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken, user };
}

export async function logout(_: any, { token }: { token: string }) {
  try {
    await prisma.session.delete({
      where: { token },
    });
    return true;
  } catch (err) {
    console.error("Logout failed:", err);
    throw new Error(
      "Failed to logout. Token may be invalid or already deleted."
    );
  }
}

export async function refreshToken(_: any, { token }: { token: string }) {
  try {
    const { userId } = verifyRefreshToken(token);

    const session = await prisma.session.findUnique({
      where: { token },
    });

    if (
      !session ||
      session.userId !== userId ||
      session.expiresAt < new Date()
    ) {
      throw new Error("Invalid or expired refresh token");
    }

    const accessToken = generateAccessToken(userId);
    return { accessToken };
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
}
