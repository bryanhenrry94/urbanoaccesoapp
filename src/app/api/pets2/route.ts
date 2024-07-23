import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const client = new Client({
    user: 'default',
    host: 'ep-royal-sun-a4lnx1yr-pooler.us-east-1.aws.neon.tech',
    database: 'verceldb',
    password: 'DWBU6Y8nkJyq',
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const res = await client.query('SELECT * FROM Pets;');
    console.log("Respuesta completa:", res);
    console.log("Filas:", res.rows);
    await client.end();
    return NextResponse.json({ 'pets': res.rows }, { status: 200 });
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    return NextResponse.json({ 'error': 'Error al realizar la consulta' }, { status: 500 });
  }
}
