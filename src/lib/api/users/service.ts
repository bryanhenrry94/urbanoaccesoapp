import { sql } from "@vercel/postgres";
import { User } from "@/lib/api/users/types";

export async function getUsers(): Promise<User[]> {
  try {
    const { rows } = await sql`SELECT * FROM users`;
    return rows.map((row): User => ({
      id: row.id,
      email: row.email,
      password_hash: row.password_hash,
      name: row.name,
      image: row.image
    }));
  } catch (error) {
    console.error("Error getting users:", error);
    throw new Error("Error retrieving users");
  }
}

export async function createUser(userData: Omit<User, "id">): Promise<User> {
  const { email, password_hash, name, image } = userData;
  try {
    const { rows } = await sql`
      INSERT INTO users (email, password_hash, name, image)
      VALUES (${email}, ${password_hash}, ${name}, ${image})
      RETURNING *
    `;
    const user: User = {
      id: rows[0].id,
      email: rows[0].email,
      password_hash: rows[0].password_hash,
      name: rows[0].name,
      image: rows[0].image
    };
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  const { email, password_hash, name, image } = userData;
  try {
    const { rows } = await sql`
      UPDATE users
      SET 
        email = COALESCE(${email}, email),
        password_hash = COALESCE(${password_hash}, password_hash),
        name = COALESCE(${name}, name),
        image = COALESCE(${image}, image)
      WHERE id = ${id}
      RETURNING *
    `;
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    const user: User = {
      id: rows[0].id,
      email: rows[0].email,
      password_hash: rows[0].password_hash,
      name: rows[0].name,
      image: rows[0].image
    };
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const { rowCount } = await sql`DELETE FROM users WHERE id = ${id}`;
    if (rowCount === 0) {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
}
