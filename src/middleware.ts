import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // Rutas que deben ser protegidas
  const protectedPaths = ['/dashboard', '/profile'];

  // Verificar si la ruta está protegida
  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    // Redirigir a la página de inicio de sesión si no está autenticado
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';  // Redirige a la página de inicio de sesión
      return NextResponse.redirect(url);
    }
  }

  // Permitir el acceso a rutas no protegidas
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/profile'], // Rutas que deben ser protegidas
};
