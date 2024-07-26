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
      alert("Passwords do not match");
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
        console.log("User registered:", user);

        // Iniciar sesión automáticamente después del registro
        const signInResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          console.error("Error signing in:", signInResult.error);
          alert(
            "Registration successful, but there was an error signing in. Please try logging in manually."
          );
        } else {
          //Redirigir al dashboard después del inicio de sesión exitoso
          router.push("/dashboard");
        }
      } else {
        const errorData = await res.json();
        console.error("Registration failed:", errorData.error);
        alert(`Registration failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        "An unexpected error occurred during registration. Please try again."
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-6">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Registro
              </h1>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  aria-label="Nombre"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">Confirmar Contraseña</Label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="****"
                  required
                  aria-label="Confirmar Contraseña"
                />
              </div>
              <RegisterButton type="submit">
                <FaUserPlus className="mr-2 h-4 w-4" />
                Registrarse
              </RegisterButton>
            </div>
          </form>
          <p className="mt-2 text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
