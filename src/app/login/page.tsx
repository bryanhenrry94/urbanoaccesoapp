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
import NavBar from "@/components/ui/Navbar";

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

    const signInResult = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (signInResult?.error) {
      console.error("Error signing in:", signInResult.error);
      alert("Credenciales inválidas. Por favor, intente de nuevo.");
    } else {
      router.push("/dashboard");
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
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/UrbanoAcceso.svg"
              alt="Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-800">
              Inicio de Sesión
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700">Usuario</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                aria-label="Email"
                className="w-full mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="****"
                required
                aria-label="Contraseña"
                className="w-full mt-1"
              />
            </div>
            <LoginButton type="submit" className="w-full">
              <FaKey className="mr-2 h-4 w-4" />
              Ingresar
            </LoginButton>
          </form>
          <div className="my-6 flex items-center justify-between">
            <hr className="w-full" />
            <span className="px-2 text-gray-500">O</span>
            <hr className="w-full" />
          </div>
          <LoginGoogle className="w-full" onClick={handleLoginWithGoogle}>
            <FaGoogle className="mr-2 h-4 w-4" />
            Ingresar con Google
          </LoginGoogle>
          <p className="mt-6 text-center text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline"
              prefetch={false}
            >
              Registrar
            </Link>
          </p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>&copy; 2024 UrbanoAcceso. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
