import { env } from '@/env';
import './global.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import type { Metadata } from 'next';
import type React from 'react';
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
}: RootLayoutProperties): React.ReactNode {
  return (
    <html className={fonts} lang="en" suppressHydrationWarning>
      <body>
        <DesignSystemProvider
          helpUrl={env.NEXT_PUBLIC_WEB_URL}
          privacyUrl={new URL(
            '/privacy-policy',
            env.NEXT_PUBLIC_WEB_URL
          ).toString()}
          termsUrl={new URL('/terms', env.NEXT_PUBLIC_WEB_URL).toString()}
        >
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
}
