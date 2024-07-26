// "use client" se usa para indicar que este componente es un componente del lado del cliente
"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image"

export default function Page() {
  const { data: session } = useSession();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <h1>Hello, Dashboard!</h1>
      {session?.user ? (
        <div>
          <h2>{session.user.name}</h2>
          <h2>{session.user.email}</h2>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User Image"}
              className="rounded-full w-10 h-10"
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
