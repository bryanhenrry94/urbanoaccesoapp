import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./Provider";
import { TenantProvider, Tenant } from '@/contexts/TenantContext';
import { headers } from "next/headers";
import { getTenantBySubdomain } from "@/lib/db";

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
  const headersList = headers();
  const subdomain = headersList.get("x-subdomain");
  // const tenant = await getTenantBySubdomain(subdomain);
  const tenant = await getTenantBySubdomain(subdomain) as Tenant | null;
  
  return (
    <html lang="en">
      <TenantProvider value={{ tenant }}>
        <SessionProvider>
          <body className={inter.className}>{children}</body>
        </SessionProvider>
        </TenantProvider>
    </html>
  );
}
