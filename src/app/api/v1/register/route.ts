import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { existsUser, createUser } from '@/db/users';

export async function POST(request: Request) {
  try {
    const { email, password, name, image } = await request.json();

    // Check if the email already exists
    const emailExists = await existsUser(email);

    if (emailExists) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const newUser = await createUser(email, hashedPassword, name, image);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
