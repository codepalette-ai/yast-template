import { env } from "@/env";
import "./global.css";
import { DesignSystemProvider } from "@repo/design-system";
import { fonts } from "@repo/design-system/lib/fonts";
import type { ReactNode } from "react";
import type { Metadata } from "next";

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
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body>
        <DesignSystemProvider
          privacyUrl={new URL("/privacy", env.NEXT_PUBLIC_WEB_URL).toString()}
          termsUrl={new URL("/terms", env.NEXT_PUBLIC_WEB_URL).toString()}
          helpUrl={env.NEXT_PUBLIC_WEB_URL}
        >
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
}
