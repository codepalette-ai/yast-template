import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-start font-medium text-muted-foreground transition-colors hover:text-foreground"
          href="/"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
        {children}
      </div>
    </div>
  );
}
