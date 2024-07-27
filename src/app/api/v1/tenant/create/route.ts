import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  const { name, subdomain } = await request.json();

  try {
    const result = await sql`
      INSERT INTO tenants (name, subdomain)
      VALUES (${name}, ${subdomain})
      RETURNING id, name, subdomain
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar tenant:', error);
    return NextResponse.json({ error: 'Error al registrar tenant' }, { status: 500 });
  }
}