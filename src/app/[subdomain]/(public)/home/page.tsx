"use client";

import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background-alt">
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12 mt-12">
          <h1 className="text-4xl font-bold text-text mb-4">
            Bienvenido a UrbanoAcceso
          </h1>
          <p className="text-xl text-text-light">
            Su solución integral para el control y gestión de urbanizaciones
          </p>
        </section>

        <section className="mb-12 max-w-4xl mx-auto">
          <div className="bg-background p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-text mb-6 text-center">
              Comienza por 30 días{" "}
              <span className="text-4xl text-primary font-bold">GRATIS</span>
            </h2>
            <p className="text-lg text-text-light text-center mb-8">
              Prueba todas las funcionalidades de nuestra versión Pro sin compromiso. No pedimos números de tarjetas de crédito, sin recargo alguno.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-secondary p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Administrador
                </h3>
                <ul className="list-disc list-inside text-text">
                  <li>Gestión completa de residentes</li>
                  <li>Control financiero y reportes</li>
                  <li>Configuración de áreas comunes</li>
                </ul>
              </div>
              <div className="bg-secondary p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Residente
                </h3>
                <ul className="list-disc list-inside text-text">
                  <li>Registro de visitantes</li>
                  <li>Reserva de áreas comunes</li>
                  <li>Pago de cuotas en línea</li>
                </ul>
              </div>
              <div className="bg-secondary p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Guardia de Seguridad
                </h3>
                <ul className="list-disc list-inside text-text">
                  <li>Control de acceso en tiempo real</li>
                  <li>Registro de entradas y salidas</li>
                  <li>Gestión de incidencias</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <a
                href="/register"
                className="btn-primary"
              >
                Comenzar prueba gratuita
              </a>
            </div>
          </div>
        </section>

        <section className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-text mb-6 text-center">
            Descubre UrbanoAcceso
          </h2>
          <div
            className="relative"
            style={{ paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=p0OH206z9Wg"
              title="UrbanoAcceso Product Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section className="mb-12 max-w-3xl mx-auto p-8 bg-secondary rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-text mb-4">
              ¿Necesitas ayuda en el proceso?
            </h2>
            <p className="text-text mb-4">
              Te asesoramos{" "}
              <span className="text-primary font-bold text-2xl">
                sin costo
              </span>{" "}
              vía Google Meet
            </p>
            <a
              href="/contact"
              className="btn-primary"
            >
              Reservar asesoría
            </a>
          </div>
        </section>

        <section className="mb-12 max-w-1xl mx-auto bg-secondary p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-text mb-6 text-center">
            Características del Producto
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
              <Image
                src="/images/accessibility.svg"
                alt="Accesibilidad Total"
                width={300}
                height={200}
              />
              <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                Accesibilidad Total
              </h3>
              <p className="text-text-light text-center">
                Controle y monitoree el acceso a su urbanización desde cualquier
                lugar y en cualquier momento, utilizando nuestra aplicación
                móvil o plataforma web.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
              <Image
                src="/images/centralized-control.svg"
                alt="Control Centralizado"
                width={300}
                height={200}
              />
              <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                Control Centralizado
              </h3>
              <p className="text-text-light text-center">
                Gestione múltiples puntos de acceso, áreas comunes y servicios
                desde un solo lugar, simplificando la administración de su
                comunidad.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
              <Image
                src="/images/expense-management.svg"
                alt="Gestión de Gastos Comunitarios"
                width={300}
                height={200}
              />
              <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                Gestión de Gastos Comunitarios
              </h3>
              <p className="text-text-light text-center">
                Administre eficientemente los gastos de la comunidad, genere
                informes y mantenga la transparencia financiera con nuestro
                módulo de gestión de gastos integrado.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
              <Image
                src="/images/advanced-security.svg"
                alt="Seguridad Avanzada"
                width={300}
                height={200}
              />
              <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                Seguridad Avanzada
              </h3>
              <p className="text-text-light text-center">
                Implemente medidas de seguridad de última generación, incluyendo
                reconocimiento facial, códigos QR dinámicos y notificaciones en
                tiempo real.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 max-w-1xl mx-auto bg-secondary p-8 rounded-lg shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-text text-center mb-8">
              Comentarios y Reseñas
            </h2>
            <div className="flex overflow-x-auto space-x-6 pb-4">
              {[
                {
                  name: "María García",
                  rating: 5,
                  comment:
                    "Excelente servicio, ha mejorado significativamente la seguridad de nuestra urbanización.",
                },
                {
                  name: "Juan Pérez",
                  rating: 4,
                  comment:
                    "Muy buena aplicación, fácil de usar y con muchas funcionalidades útiles.",
                },
                {
                  name: "Ana Martínez",
                  rating: 5,
                  comment:
                    "El control de accesos nunca había sido tan sencillo. ¡Totalmente recomendado!",
                },
                {
                  name: "Carlos Rodríguez",
                  rating: 4,
                  comment:
                    "Gran herramienta para la gestión de la comunidad. El soporte técnico es muy eficiente.",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="flex-none w-80 bg-background rounded-lg p-6 shadow-md"
                >
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {review.name}
                  </h3>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-primary" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-light">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12 max-w-1xl mx-auto bg-secondary p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-text mb-6 text-center">
            Nuestros Clientes
          </h2>
          <div className="flex overflow-hidden">
            <div className="flex space-x-12 animate-carousel">
              <Image
                src="/logos/cliente1.png"
                alt="Cliente 1"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente2.png"
                alt="Cliente 2"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente3.png"
                alt="Cliente 3"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente4.png"
                alt="Cliente 4"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente5.png"
                alt="Cliente 5"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente6.png"
                alt="Cliente 6"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente7.png"
                alt="Cliente 7"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente8.png"
                alt="Cliente 8"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente9.png"
                alt="Cliente 9"
                width={100}
                height={100}
              />
              <Image
                src="/logos/cliente10.png"
                alt="Cliente 10"
                width={100}
                height={100}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;