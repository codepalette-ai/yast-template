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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
