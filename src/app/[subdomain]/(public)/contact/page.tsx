import React from "react";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background-alt">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-text mb-8 text-center">Contáctenos</h1>

        <div className="max-w-2xl mx-auto bg-background shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-text mb-6 text-center">No pierdas la oportunidad de gestionar los gastos comunitarios de tu urbanización</h2>
          
          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/register" className="btn-primary hover:bg-primary-dark transition-default">
              Empieza hoy gratis 30 días
            </Link>
            <Link href="/contact" className="btn-secondary hover:bg-secondary-dark transition-default">
              Visita la demo del sistema
            </Link>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-text-light font-medium mb-2">Nombre</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-text-light font-medium mb-2">Correo Electrónico</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-text-light font-medium mb-2">Mensaje</label>
              <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required></textarea>
            </div>
            <button type="submit" className="w-full btn-primary hover:bg-primary-dark transition-default">Enviar Mensaje</button>
          </form>
        </div>

        <div className="text-center text-text-light">
          <p>Para más información, contáctenos en:</p>
          <p>Email: info@urbanoacceso.com | Teléfono: +1 (555) 123-4567</p>
          <p>Sitio web: www.urbanoacceso.com</p>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
