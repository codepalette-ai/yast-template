import { env } from "@/env";
import "./global.css";
import { DesignSystemProvider } from "@repo/design-system";
import { fonts } from "@repo/design-system/lib/fonts";
import type { ReactNode } from "react";

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
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

export default RootLayout;
