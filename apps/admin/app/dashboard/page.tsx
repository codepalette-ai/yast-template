import { auth } from '@repo/auth/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/dashboard-header';

const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
  title,
  description,
};

export default async function App() {
  const { userId } = await auth();

  if (!userId) {
    notFound();
  }

  return (
    <>
      <Header page="Dashboard" pages={['Dashboard']} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">Dashboard Page</div>
    </>
  );
}
