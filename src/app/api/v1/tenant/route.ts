import { NextRequest, NextResponse } from "next/server";
import { getTenantBySubdomain } from "@/db/tenants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subdomain = searchParams.get("subdomain");

  if (!subdomain) {
    return NextResponse.json(
      { error: "Subdomain parameter is required" },
      { status: 400 }
    );
  }

  try {
    const tenant = await getTenantBySubdomain(subdomain);

    if (!tenant) {
      return NextResponse.json(
        { error: "Tenant not found for the given subdomain" },
        { status: 404 }
      );
    }

    return NextResponse.json(tenant);
  } catch (error) {
    console.error("Error fetching tenant by subdomain:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
