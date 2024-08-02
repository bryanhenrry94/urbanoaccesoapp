import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTenantBySubdomain, getTenantByEmail } from "@/lib/db";

const subdomains = [{ subdomain: "vallenorte" }, { subdomain: "villasantay" }, { subdomain: "villablanca" }];
const protectedPaths = ["/admin", "/dashboard", "/profile"];

export async function middleware(req: NextRequest) {
  console.log("Middleware ejecutado");
  console.log("URL de la solicitud:", req.nextUrl.pathname);
  // Intercepta el callback de credenciales para redirigir al tenant
  if (req.nextUrl.pathname.startsWith('/api/auth/callback/credentials')) {
    console.log("Interceptando callback de credenciales");
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      console.log("Token encontrado:", token);
      const email = token.email as string;
      console.log("Email del token:", email);
      const tenant = await getTenantByEmail(email);
      if (tenant) {
        console.log("Tenant encontrado:", tenant);
        const newUrl = new URL(`/${tenant.subdomain}/dashboard`, req.url);
        console.log("Redirigiendo a:", newUrl.toString());
        return NextResponse.redirect(newUrl);
      } else {
        console.log("No se encontró tenant para el email:", email);
      }
    } else {
      console.log("No se encontró token en la solicitud");
    }
  }

  // Resto del código del middleware...
  // (Se ha omitido el código comentado para mantener la claridad)

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      const loginUrl = new URL(`/login`, process.env.NEXT_PUBLIC_ROOT_DOMAIN);
      return NextResponse.redirect(loginUrl);
    }

    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";
    const allowedDomains = ["localhost:3000", "urbanoaccesoapp.vercel.app", "urbanoacceso.com"];
    const isAllowedDomain = allowedDomains.some((domain) => hostname.includes(domain));
    const subdomain = hostname.split(".")[0];
    const isAllowedSubdomain = await getTenantBySubdomain(subdomain);

    if(isAllowedSubdomain === null){
      const loginUrl = new URL(`/error`, process.env.NEXT_PUBLIC_ROOT_DOMAIN);
      return NextResponse.redirect(loginUrl);
    }

    if (isAllowedDomain && !isAllowedSubdomain) {
      return NextResponse.next();
    }

    if (isAllowedSubdomain) {
      return NextResponse.rewrite(
        new URL(`/${subdomain}${url.pathname}`, req.url)
      );
    }

    return new Response(null, { status: 404 });
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
