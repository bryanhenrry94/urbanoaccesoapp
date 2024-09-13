import React from "react";
import Link from "next/link";

const PricingPage = () => {
  const plans = [
    {
      name: "Básico",
      price: 29.99,
      features: [
        "Hasta 50 usuarios",
        "5GB de almacenamiento",
        "Correos electrónicos básicos",
        "Soporte por correo electrónico",
        "Control de acceso básico",
      ],
    },
    {
      name: "Standard",
      price: 59.99,
      features: [
        "Hasta 200 usuarios",
        "20GB de almacenamiento",
        "Personalización de correos",
        "Soporte telefónico",
        "Control de acceso avanzado",
        "Gestión de gastos comunitarios",
      ],
    },
    {
      name: "Pro",
      price: 99.99,
      features: [
        "Usuarios ilimitados",
        "100GB de almacenamiento",
        "Personalización completa de correos",
        "Soporte prioritario 24/7",
        "Control de acceso con reconocimiento facial",
        "Gestión avanzada de gastos",
        "Integración con sistemas de seguridad",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background-alt">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-text mb-8 text-center">
          Nuestros Planes
        </h1>
        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-background shadow-lg rounded-lg overflow-hidden w-full max-w-sm flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <h2 className="text-2xl font-semibold text-text mb-4">
                    {plan.name}
                  </h2>
                  <ul className="mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center mb-2 text-text-light">
                        <svg
                          className="h-5 w-5 text-primary mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary p-6 mt-auto">
                  <div className="text-3xl font-bold text-text mb-4">
                    ${plan.price}
                    <span className="text-lg font-normal">/mes</span>
                  </div>
                  <Link
                    href="/contact"
                    className="block w-full btn-primary hover:bg-primary-dark transition-default"
                  >
                    Obtener
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <details className="bg-background shadow-md rounded-lg">
              <summary className="text-xl font-semibold text-text p-6 cursor-pointer">
                ¿Puedo cambiar de plan en cualquier momento?
              </summary>
              <p className="text-text-light p-6 pt-0">
                Sí, puede cambiar de plan en cualquier momento. Los cambios se
                aplicarán al inicio del siguiente ciclo de facturación.
              </p>
            </details>
            <details className="bg-background shadow-md rounded-lg">
              <summary className="text-xl font-semibold text-text p-6 cursor-pointer">
                ¿Hay un período de prueba gratuito?
              </summary>
              <p className="text-text-light p-6 pt-0">
                Ofrecemos un período de prueba gratuito de 30 días para que
                pueda explorar todas las funcionalidades de nuestra plataforma.
              </p>
            </details>
            <details className="bg-background shadow-md rounded-lg">
              <summary className="text-xl font-semibold text-text p-6 cursor-pointer">
                ¿Qué métodos de pago aceptan?
              </summary>
              <p className="text-text-light p-6 pt-0">
                Aceptamos tarjetas de crédito/débito principales y
                transferencias bancarias para pagos mensuales o anuales.
              </p>
            </details>
            <details className="bg-background shadow-md rounded-lg">
              <summary className="text-xl font-semibold text-text p-6 cursor-pointer">
                ¿Ofrecen descuentos para pagos anuales?
              </summary>
              <p className="text-text-light p-6 pt-0">
                Sí, ofrecemos un descuento del 10% para los clientes que opten
                por el pago anual de cualquiera de nuestros planes.
              </p>
            </details>
          </div>
          <div className="mt-10 text-center">
            <p className="text-xl text-text-light mb-4">
              ¿Tienes alguna otra pregunta?
            </p>
            <Link
              href="/contact"
              className="inline-block btn-primary hover:bg-primary-dark transition-default"
            >
              Contáctanos
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PricingPage;
