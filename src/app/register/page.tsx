"use client";

import React, { useState } from "react";
import Image from "next/image";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button/Primary";
import Link from "next/link";

const StartPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    workspace: "",
    url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-2/5 lg:w-1/3 p-4 md:p-8 overflow-y-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <Image
            src="/UrbanoAcceso.svg"
            alt="Logo"
            className="h-10 w-auto mr-2"
            width={100}
            height={100}
          />
          <span className="text-xl font-semibold text-gray-800">
            <Link href="/">UrbanoAcceso</Link>
          </span>
        </div>
        <h1 className="text-1xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
          Bienvenido
        </h1>
        <p className="mb-6 md:mb-8 text-sm md:text-base">
          Comencemos configurando tu cuenta y espacio de trabajo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="workspace">Espacio de trabajo</Label>
            <Input
              id="workspace"
              name="workspace"
              type="text"
              required
              value={formData.workspace}
              onChange={(e) => {
                const value = e.target.value;
                handleChange(e);
                const isValidSubdomain = /^[a-zA-Z0-9-]+$/.test(value);
                if (isValidSubdomain) {
                  const newUrl = `http://${value}.${process.env.NEXT_DOMAIN || "localhost:3000"}`;
                  setFormData((prev) => ({ ...prev, url: newUrl }));
                } else {
                  setFormData((prev) => ({ ...prev, url: "" }));
                }
              }}
              className="w-full"
            />
            {formData.url ? (
              <p className="mt-2 text-sm text-green-600">URL: {formData.url}</p>
            ) : (
              <p className="mt-2 text-sm text-red-600">
                El nombre del espacio de trabajo solo puede contener letras,
                números y guiones
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Comenzar
          </Button>
        </form>
        <p className="mt-4 md:mt-6 text-center text-gray-600 text-sm md:text-base">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </div>

      <div className="w-full md:w-3/5 lg:w-2/3 relative bg-slate-100 flex items-center justify-center">
        <Image
          src="/images/building_websites.svg"
          alt="Imagen de bienvenida"
          layout="responsive"
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 66vw"
          priority
        />
      </div>
    </div>
  );
};

export default StartPage;
