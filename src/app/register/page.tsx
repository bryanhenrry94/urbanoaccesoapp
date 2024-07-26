"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import RegisterButton from "@/components/ui/Button/Primary";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaUserPlus } from "react-icons/fa";
import NavBar from "@/components/ui/Navbar";
import Image from "next/image";

interface RegisterForm {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  image: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    image: "http://localhost:3000/profile-pictures/default-profile.jpg",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          image: formData.image,
        }),
      });

      if (res.ok) {
        const user = await res.json();
        console.log("Usuario registrado:", user);

        const signInResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          console.error("Error al iniciar sesión:", signInResult.error);
          alert(
            "Registro exitoso, pero hubo un error al iniciar sesión. Por favor, intente iniciar sesión manualmente."
          );
        } else {
          router.push("/dashboard");
        }
      } else {
        const errorData = await res.json();
        console.error("Fallo en el registro:", errorData.error);
        alert(`Fallo en el registro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert(
        "Ocurrió un error inesperado durante el registro. Por favor, intente nuevamente."
      );
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
              Registro
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700">Nombre</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                aria-label="Nombre"
                className="w-full mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
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
            <div>
              <Label htmlFor="confirm_password" className="text-gray-700">Confirmar Contraseña</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="****"
                required
                aria-label="Confirmar Contraseña"
                className="w-full mt-1"
              />
            </div>
            <RegisterButton type="submit" className="w-full">
              <FaUserPlus className="mr-2 h-4 w-4" />
              Registrarse
            </RegisterButton>
          </form>
          <p className="mt-6 text-center text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline"
              prefetch={false}
            >
              Iniciar Sesión
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

export default RegisterPage;
