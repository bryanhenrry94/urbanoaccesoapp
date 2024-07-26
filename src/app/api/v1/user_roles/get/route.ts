import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const result = await sql`
        SELECT r.* from user_roles ur 
        INNER JOIN users u on ur.user_id = u.id
        INNER JOIN roles r on ur.role_id = r.id
        WHERE u.email = ${email};
      `;

    return NextResponse.json({ roles: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ error: "Error checking user" }, { status: 500 });
  }
}
