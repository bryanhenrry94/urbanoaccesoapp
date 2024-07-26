import React from "react";
import NavBar from "@/components/ui/Navbar";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sobre <span className="text-blue-600  px-2 py-1 rounded-lg transform hover:scale-105 transition-transform duration-300 inline-block">UrbanoAcceso</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <section className="bg-white shadow-lg rounded-lg p-8 flex-1">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Nuestra Misión
              </h2>
              <Image
                src="/images/mission.png"
                alt="Misión"
                width={100}
                height={100}
              />
              <p className="text-gray-600">
                Ofrecer software innovador para la administración de comunidades,
                facilitando el control de acceso y la gestión financiera de manera
                eficiente, segura y transparente.
              </p>
            </div>
          </section>

          <section className="bg-white shadow-lg rounded-lg p-8 flex-1">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Nuestra Visión
              </h2>
              <Image
                src="/images/vision.png"
                alt="Visión"
                width={100}
                height={100}
              />
              <p className="text-gray-600">
                Ser líderes en soluciones tecnológicas para comunidades,
                destacando por nuestra excelencia en control de acceso y gestión
                financiera, mejorando la seguridad y organización de las
                comunidades que servimos.
              </p>
            </div>
          </section>

          <section className="bg-slate-100 shadow-lg rounded-lg p-8 flex-1">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Nuestros Valores
              </h2>
              <Image
                src="/images/values.png"
                alt="Valores"
                width={100}
                height={100}
              />
              <ul className="list-disc list-inside text-gray-600">
                <li>Innovación constante</li>
                <li>Integridad y transparencia</li>
                <li>Compromiso con la excelencia</li>
                <li>Enfoque en el cliente</li>
                <li>Responsabilidad social y ambiental</li>
              </ul>
            </div>
          </section>
        </div>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
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
              <h3 className="text-lg font-semibold text-gray-700">
                María Rodríguez
              </h3>
              <p className="text-sm text-gray-600">CEO y Fundadora</p>
              <a href="https://www.linkedin.com/in/maria-rodriguez" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 mt-1">
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
              <h3 className="text-lg font-semibold text-gray-700">
                Carlos Gómez
              </h3>
              <p className="text-sm text-gray-600">Director de Tecnología</p>
              <a href="https://www.linkedin.com/in/carlos-gomez" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 mt-1">
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
              <h3 className="text-lg font-semibold text-gray-700">
                Ana Martínez
              </h3>
              <p className="text-sm text-gray-600">Directora de Operaciones</p>
              <a href="https://www.linkedin.com/in/ana-martinez" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 mt-1">
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
              <h3 className="text-lg font-semibold text-gray-700">
                Luis Sánchez
              </h3>
              <p className="text-sm text-gray-600">
                Dir. Desarrollo de Negocios
              </p>
              <a href="https://www.linkedin.com/in/luis-sanchez" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 mt-1">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>&copy; 2024 UrbanoAcceso. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
