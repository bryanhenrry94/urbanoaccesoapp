import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { updateUserProfilePicture } from '@/lib/db'; 

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('profilePicture') as File;
  const userId = formData.get('userId') as string;

  if (!file) {
    return NextResponse.json({ error: 'No se proporcionó ninguna imagen' }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generar un nombre de archivo único
    const fileName = `${userId}-${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(process.cwd(), 'public', 'profile-pictures', fileName);

    // Guardar el archivo en la carpeta public
    await writeFile(filePath, buffer);

    // URL relativa para acceder a la imagen
    const imageUrl = `/profile-pictures/${fileName}`;

    // Actualizar la URL de la imagen en la base de datos
    await updateUserProfilePicture(userId, imageUrl);

    return NextResponse.json({ message: 'Foto de perfil actualizada', imageUrl });
  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error);
    return NextResponse.json({ error: 'Error al procesar la imagen' }, { status: 500 });
  }
}