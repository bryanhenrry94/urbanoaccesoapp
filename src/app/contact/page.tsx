import React from "react";
import NavBar from "@/components/ui/Navbar";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contáctenos</h1>

        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">No pierdas la oportunidad de gestionar los gastos comunitarios de tu urbanización</h2>
          
          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/register" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
              Empieza hoy gratis 30 días
            </Link>
            <Link href="/contact" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300">
              Visita la demo del sistema
            </Link>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje</label>
              <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Enviar Mensaje</button>
          </form>
        </div>

        <div className="text-center text-gray-600">
          <p>Para más información, contáctenos en:</p>
          <p>Email: info@urbanoacceso.com | Teléfono: +1 (555) 123-4567</p>
          <p>Sitio web: www.urbanoacceso.com</p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>&copy; 2024 UrbanoAcceso. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
