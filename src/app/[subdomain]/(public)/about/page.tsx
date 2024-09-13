import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background-alt">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-text">
          Sobre{" "}
          <span className="text-primary bg-secondary px-2 py-1 rounded-lg transform hover:scale-105 transition-default inline-block">
            UrbanoAcceso
          </span>
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <section className="bg-background shadow-md rounded-lg p-8 flex-1">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-semibold text-text mb-4">
                Nuestra Misión
              </h2>
              <Image
                src="/images/mission.png"
                alt="Misión"
                width={100}
                height={100}
              />
              <p className="text-text-light">
                Ofrecer software innovador para la administración de
                comunidades, facilitando el control de acceso y la gestión
                financiera de manera eficiente, segura y transparente.
              </p>
            </div>
          </section>

          <section className="bg-background shadow-md rounded-lg p-8 flex-1">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-semibold text-text mb-4">
                Nuestra Visión
              </h2>
              <Image
                src="/images/vision.png"
                alt="Visión"
                width={100}
                height={100}
              />
              <p className="text-text-light">
                Ser líderes en soluciones tecnológicas para comunidades,
                destacando por nuestra excelencia en control de acceso y gestión
                financiera, mejorando la seguridad y organización de las
                comunidades que servimos.
              </p>
            </div>
          </section>

          <section className="bg-secondary shadow-md rounded-lg p-8 flex-1">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-semibold text-text mb-4">
                Nuestros Valores
              </h2>
              <Image
                src="/images/values.png"
                alt="Valores"
                width={100}
                height={100}
              />
              <ul className="list-disc list-inside text-text-light">
                <li>Innovación constante</li>
                <li>Integridad y transparencia</li>
                <li>Compromiso con la excelencia</li>
                <li>Enfoque en el cliente</li>
                <li>Responsabilidad social y ambiental</li>
              </ul>
            </div>
          </section>
        </div>

        <section className="bg-background shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-text mb-4">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <Image
                src="/team/picture1.jpg"
                alt="María Rodríguez"
                width={100}
                height={100}
                className="rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold text-text">
                María Rodríguez
              </h3>
              <p className="text-sm text-text-light">CEO y Fundadora</p>
              <a
                href="https://www.linkedin.com/in/maria-rodriguez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-default mt-1"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/team/picture2.jpg"
                alt="Carlos Gómez"
                width={100}
                height={100}
                className="rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold text-text">Carlos Gómez</h3>
              <p className="text-sm text-text-light">Director de Tecnología</p>
              <a
                href="https://www.linkedin.com/in/carlos-gomez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-default mt-1"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/team/picture3.jpg"
                alt="Ana Martínez"
                width={100}
                height={100}
                className="rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold text-text">Ana Martínez</h3>
              <p className="text-sm text-text-light">
                Directora de Operaciones
              </p>
              <a
                href="https://www.linkedin.com/in/ana-martinez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-default mt-1"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/team/picture4.jpg"
                alt="Luis Sánchez"
                width={100}
                height={100}
                className="rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold text-text">Luis Sánchez</h3>
              <p className="text-sm text-text-light">
                Dir. Desarrollo de Negocios
              </p>
              <a
                href="https://www.linkedin.com/in/luis-sanchez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-default mt-1"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
