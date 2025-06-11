import type { Metadata } from 'next';
import type { ReactNode } from 'react';
type RootLayoutProperties = {
  readonly children: ReactNode;
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: RootLayoutProperties): ReactNode {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
