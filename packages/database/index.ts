import "server-only";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const database =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = database;
}

export * from "./generated/client";
