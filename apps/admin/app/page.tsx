"use server";

import { redirect } from "next/navigation";
import { auth } from "@repo/auth/server";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    console.log("Redirecting to sign-in");
    return redirect("/sign-in");
  }

  return redirect("/dashboard");
}
