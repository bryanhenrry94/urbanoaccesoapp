import { NextRequest, NextResponse } from "next/server";
import { getTenantByEmail } from "@/db/tenants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter is required" },
      { status: 400 }
    );
  }

  try {
    const tenant = await getTenantByEmail(email);

    if (!tenant) {
      return NextResponse.json(
        { error: "Tenant not found for the given email" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(tenant);

    response.headers.set("x-tenant-subdomain", tenant.subdomain);

    return response;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
