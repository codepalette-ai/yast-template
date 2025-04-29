import type { ReactNode } from "react";

type RootLayoutProperties = {
  readonly children: ReactNode;
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
