import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrbanoAcceso",
  description: "Control de acceso a urbanizacion y residencias",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
