import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name, password_hash, image } = await request.json();

  try {
    // Insert the new user
    await sql`
      INSERT INTO users (email, name, password_hash, image)
      VALUES (${email}, ${name}, ${password_hash}, ${image})
    `;

    // Select the newly created user
    const result = await sql`
      SELECT * FROM users
      WHERE email = ${email}
    `;

    const createdUser = result.rows[0];
    return NextResponse.json(
      { message: "User registered successfully", createdUser: createdUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Error registering user" },
      { status: 500 }
    );
  }
}
