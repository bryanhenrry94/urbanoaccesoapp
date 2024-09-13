"use client";

import NavBar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
