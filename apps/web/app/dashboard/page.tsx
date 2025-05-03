import { auth } from "@repo/auth/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const title = "Acme Inc";
const description = "My application.";

export const metadata: Metadata = {
  title,
  description,
};

export default async function App() {
  const { userId } = await auth();

  if (!userId) {
    notFound();
  }

  return <> Logged in as {userId}</>;
}
