import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTenantBySubdomain } from "@/lib/db";

const protectedPaths = ["/admin"];
const allowedDomains = ["localhost:3000", "urbanoaccesoapp.vercel.app", "urbanoacceso.com"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
  
  // Check if it's an allowed domain
  const isAllowedDomain = allowedDomains.some((domain) => hostname.includes(domain));
  if (!isAllowedDomain) {
    return new Response(null, { status: 404 });
  }

  // Check if it's an allowed subdomain
  const isAllowedSubdomain = await getTenantBySubdomain(subdomain);
  if (!isAllowedSubdomain && subdomain !== "www" && !hostname.startsWith("localhost")) {
    return new Response(null, { status: 404 });
  }

  // Check if the path is under /admin
  if (url.pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If not authenticated, redirect to login
    if (!token) {
      const protocol = req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
      const loginUrl = new URL(`/login`, `${protocol}://${hostname}`);
      return NextResponse.redirect(loginUrl);
    }

    // If authenticated and it's a valid subdomain, rewrite the URL
    if (isAllowedSubdomain) {
      return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
