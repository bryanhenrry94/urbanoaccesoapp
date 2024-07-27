import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { useTenant } from "@/contexts/TenantContext";

export const dynamic = "force-dynamic";

export async function GET() {
  const { tenant } = useTenant();
  
  try {
    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    }

    const result = await sql`
      SELECT * FROM users WHERE tenant_id = ${tenant.id}
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching users by tenant:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
