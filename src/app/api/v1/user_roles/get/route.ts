import { NextResponse } from "next/server";
import { getUserRolesByEmail } from "@/db/user_roles";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const result = await getUserRolesByEmail(email);

    return NextResponse.json({ roles: result }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ error: "Error checking user" }, { status: 500 });
  }
}
