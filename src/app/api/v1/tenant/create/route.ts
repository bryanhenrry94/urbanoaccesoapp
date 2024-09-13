import { NextResponse } from "next/server";
import { createTenant } from "@/db/tenants";

export async function POST(request: Request) {
  const { name, subdomain } = await request.json();

  try {
    const result = await createTenant(name, subdomain);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al registrar tenant:", error);
    return NextResponse.json(
      { error: "Error al registrar tenant" },
      { status: 500 }
    );
  }
}
