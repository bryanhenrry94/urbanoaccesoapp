import React from "react";
import Link from "next/link";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import LoginButton from "@/components/ui/Button/Primary";
import LoginGoogle from "@/components/ui/Button/Secondary";

import { FaKey } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const page = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-6">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Inicio de Sesión
          </h1>
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Usuario</Label>
            <Input
              name="email"
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              name="password"
              type="password"
              placeholder="****"
              required
            />
          </div>
          <LoginButton type="submit">
            <FaKey className="mr-2 h-4 w-4" />
            Ingresar
          </LoginButton>
        </div>
        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500">O</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>
        <LoginGoogle className="w-full">
          <FaGoogle className="mr-2 h-4 w-4 " />
          Ingresar con Google
        </LoginGoogle>
        <p className="mt-2 text-muted-foreground">
          ¿No tienes una cuenta?
          <Link
            href="#"
            className="font-medium text-primary hover:underline"
            prefetch={false}
          >
            &nbsp;Registrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
