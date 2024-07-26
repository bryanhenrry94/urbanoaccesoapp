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
      SELECT EXISTS(SELECT 1 FROM users WHERE email = ${email})
    `;
    const exists = result.rows[0].exists;
    return NextResponse.json({ exists }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ error: "Error checking user" }, { status: 500 });
  }
}
