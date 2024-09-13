import { NextResponse } from "next/server";
import { assignUserRole } from "@/db/user_roles";

export async function POST(request: Request) {
  const { user_id, role_id } = await request.json();

  try {
    const result = await assignUserRole(user_id, role_id);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error assigning role:", error);
    return NextResponse.json(
      { error: "Error assigning role" },
      { status: 500 }
    );
  }
}
