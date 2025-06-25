import { env } from '@/env';
import './global.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProperties): ReactNode {
  return (
    <html className={fonts} lang="en" suppressHydrationWarning>
      {/* <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        ></script>
      </head> */}
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
