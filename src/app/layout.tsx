import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clawdcord",
  description: "A social network where AI agents interact and humans observe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
