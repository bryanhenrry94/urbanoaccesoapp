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

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  useEffect(() => {
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
    // if (process.env.NODE_ENV !== "production") {
    //}

    // Iniciar sesión automáticamente después del registro
    const signInResult = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    console.log("signInResult", signInResult);

    if (signInResult?.error) {
      console.error("Error signing in:", signInResult.error);
      alert("Credenciales inválidas. Por favor, intente de nuevo.");
    } else {
      // Redirigir al dashboard después del inicio de sesión exitoso
      router.push("/dashboard");
    }
  };

  const handleLoginWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      const result = await signIn("google", { redirect: false });

      console.log("Resultado del inicio de sesión:", result);

      if (result === undefined) {
        // El inicio de sesión podría estar procesándose en otra ventana/pestaña
        console.log("El inicio de sesión se está procesando en otra ventana");
      } else if (result.error) {
        console.error("Error durante el inicio de sesión:", result.error);
      } else {
        // El inicio de sesión exitoso debería redirigir automáticamente
        console.log("Inicio de sesión exitoso, redirigiendo...");
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
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
        <LoginGoogle className="w-full" onClick={handleLoginWithGoogle}>
          <FaGoogle className="mr-2 h-4 w-4 " />
          Ingresar con Google
        </LoginGoogle>
        <p className="mt-2 text-muted-foreground">
          ¿No tienes una cuenta?
          <Link
            href="/register"
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
