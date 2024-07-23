"use client";

import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  return (
    <>
      <h1>Hello, Settings!</h1>
      {pathname}
    </>
  );
}
