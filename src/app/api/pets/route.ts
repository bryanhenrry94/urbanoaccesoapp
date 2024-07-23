import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const pets = await sql`SELECT * FROM Pets;`;
    console.log("Respuesta completa:", pets);
    console.log("Filas:", pets.rows);
    return NextResponse.json({ pets: pets.rows }, { status: 200 });
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    return NextResponse.json(
      { error: "Error al realizar la consulta" },
      { status: 500 }
    );
  }
}
