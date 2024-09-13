import { sql } from "./index";

export async function getUserById(id: string) {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw new Error("Error retrieving user");
  }
}

export async function getUserByEmail(email: string) {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw new Error("Error retrieving user");
  }
}

export async function existsUser(email: string): Promise<boolean> {
  try {
    const { rows } =
      await sql`SELECT EXISTS(SELECT 1 FROM users WHERE email = ${email})`;
    return rows[0].exists;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw new Error("Error checking user existence");
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  image: string
) {
  try {
    const { rows } = await sql`
      INSERT INTO users (email, password_hash, name, image)
      VALUES (${email}, ${password}, ${name}, ${image})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
}

export async function updateUserProfilePicture(
  userId: string,
  imageUrl: string
) {
  try {
    const result = await sql`
      UPDATE users
      SET image = ${imageUrl}
      WHERE id = ${userId}
      RETURNING id, image
    `;

    if (result.rowCount === 0) {
      throw new Error("User not found");
    }

    return result.rows[0];
  } catch (error) {
    console.error(
      "Error updating user profile picture in the database:",
      error
    );
    throw new Error("Error updating profile picture");
  }
}
