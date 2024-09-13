import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">404 - Página no encontrada</h1>
      <p className="text-lg text-secondary mb-8">Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/" className="bg-accent text-white font-semibold py-2 px-4 rounded hover:bg-accent-hover transition-colors duration-300">
        Volver al inicio
      </Link>
    </div>
  );
}
