import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name, image } = await request.json();

    // Check if the email already exists
    const checkResult = await sql`
      SELECT EXISTS(SELECT 1 FROM users WHERE email = ${email})
    `;
    const emailExists = checkResult.rows[0].exists;

    if (emailExists) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const result = await sql`
      INSERT INTO users (email, password_hash, name, image)
      VALUES (${email}, ${hashedPassword}, ${name}, ${image})
      RETURNING id, email, name, image
    `;

    const newUser = result.rows[0];

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
