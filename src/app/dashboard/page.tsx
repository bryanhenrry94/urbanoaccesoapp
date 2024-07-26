"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  console.log(session);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("logout");
    console.log(e);
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <h1>Hello, Dashboard!</h1>
      <h2>{session?.user?.name}</h2>
      <h2>{session?.user?.email}</h2>
      <img src={session.user.image} alt={session?.user?.name} className="rounded-full w-10 h-10" />
      <button type="button" onClick={handleLogout}>Logout</button>
    </>
  );
}
