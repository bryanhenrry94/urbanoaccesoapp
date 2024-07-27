import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTenantBySubdomain } from "@/lib/db";

const subdomains = [{ subdomain: "test" }, { subdomain: "test1" }];
const protectedPaths = ["/admin", "/dashboard", "/profile"];

export async function middleware(req: NextRequest) {

  // Intercept POST requests to /login
  if (req.method === 'POST' && req.nextUrl.pathname === '/login') {
    const body = await req.json();
    const email = body.email;

    if (email) {
      // Extract the domain from the email
      // const domain = email.split('@')[1];

      // Get the tenant subdomain based on the email domain
      const tenant = await getTenantBySubdomain("test");

      if (tenant) {
        // Construct the new URL with the tenant subdomain
        const newUrl = new URL(`/${tenant.subdomain}.${process.env.BASE_DOMAIN}/login`);
        
        // Redirect to the new URL
        return NextResponse.redirect(newUrl);
      }
    }
  }


  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the route is protected
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // Redirect to login page if not authenticated
    if (!token) {
      const loginUrl = new URL(`/login`, process.env.NEXT_PUBLIC_ROOT_DOMAIN);
      return NextResponse.redirect(loginUrl);
    }

    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";

    // Define allowed Domains (localhost and production domain)
    const allowedDomains = ["localhost:3000", "urbanoaccesoapp.vercel.app"];

    // Verify if hostname exist in allowed domains
    const isAllowedDomain = allowedDomains.some((domain) =>
      hostname.includes(domain)
    );

    // Extraemos el posible subdominio en la URL
    // Extract the possible subdomain in the URL
    const subdomain = hostname.split(".")[0];

    const isAllowedSubdomain = await getTenantBySubdomain(subdomain);

    // si el dominio no existe, redirigimos a login
    if(isAllowedSubdomain === null){
      const loginUrl = new URL(`/error`, process.env.NEXT_PUBLIC_ROOT_DOMAIN);
      return NextResponse.redirect(loginUrl);
    }
    // Si estamos en un dominio habilitado y no es un subdominio, permitimos la solicitud.
    // If we stay in a allowed domain and its not a subdomain, allow the request.
    if (isAllowedDomain && !isAllowedSubdomain) {
      return NextResponse.next();
    }

    const subdomainData = isAllowedSubdomain;

    if (subdomainData) {
      // Rewrite the URL in the dynamic route based in the subdomain
      // Reescribe la URL a una ruta dinámica basada en el subdominio
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
