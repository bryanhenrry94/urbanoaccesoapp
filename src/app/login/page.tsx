"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import LoginButton from "@/components/ui/Button/Primary";
import LoginGoogle from "@/components/ui/Button/Secondary";
import { signIn, useSession } from "next-auth/react";

import { FaKey, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(status);

    // Redirige a /dashboard si el usuario ya está autenticado
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Evitar loguear datos sensibles en producción
    if (process.env.NODE_ENV !== "production") {
      console.log("Form data:", formData);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        const user = await res.json();
        console.log("User logged in:", user);
      } else {
        console.log("Login failed");
      }
    }
    // Aquí puedes manejar el envío del formulario, como hacer una solicitud a una API.
  };

  const handleLoginWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Inicia sesión y redirige después de que el proceso de inicio de sesión esté completo
    console.log('clic en login with google');
    const result = await signIn("google", { redirect: false });

    if (result?.ok) {
      // Aquí redirige a /dashboard solo si la autenticación es exitosa
      router.push("/dashboard");
    } else {
      // Maneja el error si la autenticación falla
      console.error("Error during sign in:", result?.error);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-6">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Inicio de Sesión
            </h1>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Usuario</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                aria-label="Email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="****"
                required
                aria-label="Contraseña"
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
        </form>
        <LoginGoogle
          className="w-full"
          onClick={handleLoginWithGoogle}
        >
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

export default LoginPage;
