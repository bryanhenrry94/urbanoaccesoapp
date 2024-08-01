"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import LoginButton from "@/components/ui/Button/Primary";
import LoginGoogle from "@/components/ui/Button/Secondary";
import Image from "next/image";
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
    if (status === "authenticated") {
      router.push("/admin");
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

    try {
      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        console.error("Error signing in:", signInResult.error);
        alert("Credenciales inválidas. Por favor, intente de nuevo.");
      } else {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error during login process:", error);
      alert(
        "Ocurrió un error durante el proceso de inicio de sesión. Por favor, intente de nuevo."
      );
    }
  };

  const handleLoginWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      const result = await signIn("google", { redirect: false });

      if (result === undefined) {
        console.log("El inicio de sesión se está procesando en otra ventana");
      } else if (result.error) {
        console.error("Error durante el inicio de sesión:", result.error);
      } else {
        console.log("Inicio de sesión exitoso, redirigiendo...");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background-alt flex items-center justify-center">
      <div className="flex w-full max-w-6xl bg-background rounded-xl shadow-2xl overflow-hidden">
        <div className="w-1/2 p-10 space-y-8">
          <div className="flex flex-col items-center">
            <Image
              src="/UrbanoAcceso.svg"
              alt="Logo"
              width={100}
              height={100}
              className="mb-6"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
              Inicio de Sesión
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Usuario
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-text-light text-text rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-text-light text-text rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <LoginButton
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-default"
              >
                <FaKey className="mr-2 h-4 w-4" />
                Ingresar
              </LoginButton>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-text-light">O continúa con</span>
              </div>
            </div>

            <div className="mt-6">
              <LoginGoogle
                onClick={handleLoginWithGoogle}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-default"
              >
                <FaGoogle className="mr-2 h-5 w-5" />
                Ingresar con Google
              </LoginGoogle>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-text-light">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary-dark transition-default"
            >
              Registrar
            </Link>
          </p>
        </div>
        <div className="w-1/2 bg-secondary flex items-center justify-center">
          <Image
            src="/images/login.svg"
            alt="Expense Management"
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
