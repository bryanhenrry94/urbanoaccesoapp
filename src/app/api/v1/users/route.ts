import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "@/lib/api/users/service";
import {
  validateUserCreation,
  validateUserUpdate,
} from "@/lib/api/users/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const validationResult = validateUserCreation(body);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error },
      { status: 400 }
    );
  }

  const newUser = await createUser(body);
  return NextResponse.json(newUser, { status: 201 });
}

// Implementa PUT y DELETE de manera similar
