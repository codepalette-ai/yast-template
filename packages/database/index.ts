import "server-only";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/client";

export const database = new PrismaClient().$extends(withAccelerate());

export * from "./generated/client";
