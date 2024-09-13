import { sql } from "./index";

export async function assignUserRole(user_id: number, role_id: number) {
  if (!user_id || !role_id) {
    throw new Error("User ID and Role ID are required");
  }

  try {
    const result = await sql`
      INSERT INTO user_roles (user_id, role_id)
      VALUES (${user_id}, ${role_id})
      RETURNING user_id, role_id
    `;

    if (result.rows.length === 0) {
      throw new Error("Failed to assign user role");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error assigning user role:", error);
    throw new Error("Error assigning user role");
  }
}

export async function getUserRolesByEmail(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const result = await sql`
      SELECT r.* from user_roles ur 
      INNER JOIN users u on ur.user_id = u.id
      INNER JOIN roles r on ur.role_id = r.id
      WHERE u.email = ${email};
    `;

    return result.rows;
  } catch (error) {
    console.error("Error fetching user roles:", error);
    throw new Error("Error fetching user roles");
  }
}
