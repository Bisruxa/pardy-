import "server-only";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const SECRET = process.env.JWT_SECRET!;

export const createTokenForUser = (userId: string) => {
  return jwt.sign({ id: userId }, SECRET);
};

export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  const payload = jwt.verify(token.value, SECRET) as { id:any };

  const user = await prisma.user.findFirst({
    where: { id: payload.id },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await prisma.user.findFirst({
    where: { email },
  });

  if (!match) throw new Error("invalid user");

  const correctPW = await comparePW(password, match.password);
  if (!correctPW) throw new Error("invalid user");

  const token = createTokenForUser(match.id);
  const { password: pw, ...user } = match;
  return { user, token };
};

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const hashedPW = await hashPW(password);
  const user = await prisma.user.create({
    data: { email, password: hashedPW },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  const token = createTokenForUser(user.id);
  return { user, token };
};

export const hashPW = (password: string) => bcrypt.hash(password, 10);
export const comparePW = (password: string, hashedPW: string) =>
  bcrypt.compare(password, hashedPW);
