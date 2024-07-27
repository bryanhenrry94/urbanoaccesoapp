// "use client" se usa para indicar que este componente es un componente del lado del cliente
"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useTenant } from "@/contexts/TenantContext";

export default function Page() {
  const { data: session } = useSession();

  const { tenant } = useTenant();

  console.log(tenant);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <h1>Bienvenido a {tenant?.name}</h1>
      <p>Subdominio: {tenant?.subdomain}</p>

      {session?.user ? (
        <div>
          <h2>{session.user.name}</h2>
          <h2>{session.user.email}</h2>
          {/* Renderiza la imagen del usuario si está disponible 
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User Image"}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          */}
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
