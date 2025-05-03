import { env } from "@/env";
import { auth, currentUser } from "@repo/auth/server";
import { secure } from "@repo/security";
import type { ReactNode } from "react";
import { PostHogIdentifier } from "@/components/posthog-identifier";

type AppLayoutProperties = {
  readonly children: ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProperties) {
  if (env.ARCJET_KEY) {
    await secure(["CATEGORY:PREVIEW"]);
  }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();

  if (!user) {
    return redirectToSignIn();
  }

  return (
    <>
      {children}
      <PostHogIdentifier />
    </>
  );
}
