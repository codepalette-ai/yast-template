import { keys as analytics } from "@repo/analytics/keys";
import { keys as auth } from "@repo/auth/keys";
import { keys as database } from "@repo/database/keys";
import { keys as email } from "@repo/email/keys";
import { keys as core } from "@repo/next-config/keys";
import { keys as observability } from "@repo/observability/keys";
import { keys as security } from "@repo/security/keys";
import { keys as storage } from "@repo/storage/keys";
import { keys as webhooks } from "@repo/webhooks/keys";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  extends: [
    auth(),
    analytics(),
    core(),
    database(),
    email(),
    observability(),
    security(),
    storage(),
    webhooks(),
  ],
  server: {
    CLERK_USER_SECRET_KEY: z.string().min(1).startsWith("sk_"),
  },
  client: {},
  runtimeEnv: {
    CLERK_USER_SECRET_KEY: process.env.CLERK_USER_SECRET_KEY,
  },
});
