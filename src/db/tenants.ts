import { sql } from "./index";

export async function getTenantBySubdomain(subdomain: string | null) {
  if (!subdomain) {
    return null;
  }

  try {
    const result = await sql`
        SELECT id, name, subdomain
        FROM tenants
        WHERE subdomain = ${subdomain}
        LIMIT 1
      `;

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el tenant por subdominio:", error);
    throw new Error("Error al obtener el tenant por subdominio");
  }
}

export async function getTenantByEmail(email: string) {
  if (!email) {
    throw new Error("El email es requerido");
  }

  try {
    const result = await sql`
        SELECT t.id, t.name, t.subdomain
        FROM users u
        JOIN tenants t ON u.tenant_id = t.id
        WHERE u.email = ${email}
        LIMIT 1
      `;

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el tenant por email:", error);
    throw new Error("Error al obtener el tenant por email");
  }
}

export async function createTenant(name: string, subdomain: string) {
  if (!name || !subdomain) {
    throw new Error("El nombre y el subdominio son requeridos");
  }

  try {
    const result = await sql`
      INSERT INTO tenants (name, subdomain)
      VALUES (${name}, ${subdomain})
      RETURNING id, name, subdomain
    `;

    if (result.rows.length === 0) {
      throw new Error("No se pudo crear el tenant");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el tenant:", error);
    throw new Error("Error al crear el tenant");
  }
}
