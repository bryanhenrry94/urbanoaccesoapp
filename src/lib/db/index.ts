import { sql } from '@vercel/postgres';

export async function updateUserProfilePicture(userId: string, imageUrl: string) {
  try {
    const result = await sql`
      UPDATE users
      SET image = ${imageUrl}
      WHERE id = ${userId}
      RETURNING id, image
    `;

    if (result.rowCount === 0) {
      throw new Error('Usuario no encontrado');
    }

    const updatedUser = result.rows[0];
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar la foto de perfil en la base de datos:', error);
    throw new Error('Error al actualizar la foto de perfil');
  }
}