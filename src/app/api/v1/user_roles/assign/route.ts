import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { user_id, role_id } = await request.json();

  try {
    const result = await sql`
      INSERT INTO user_roles (user_id, role_id)
      VALUES (${user_id}, ${role_id})
    `;
    return NextResponse.json({ message: 'Role assigned successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error assigning role:', error);
    return NextResponse.json({ error: 'Error assigning role' }, { status: 500 });
  }
}