import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Protected routes
  const protectedPaths = ["/dashboard", "/profile"];

  // Check if the route is protected
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // Redirect to login page if not authenticated
    if (!token) {
      const loginUrl = new URL(`/login`, process.env.NEXT_PUBLIC_ROOT_DOMAIN);
      return NextResponse.redirect(loginUrl);
    }

    // Get the current hostname
    const hostname = req.headers.get("host") || "";
    
    // Extract subdomain from hostname
    const subdomain = hostname.split('.')[0];

    // If subdomain doesn't match the tenant's subdomain, redirect to login
    if (subdomain !== token.tenantSubdomain) {
      const loginUrl = new URL(`/login`, process.env.NEXT_PUBLIC_ROOT_DOMAIN);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Add the current tenant to headers for later use in the application
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-tenant", token?.tenantSubdomain || "");

  // Allow access to non-protected routes
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
