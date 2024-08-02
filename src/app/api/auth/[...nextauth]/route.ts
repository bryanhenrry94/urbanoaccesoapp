// [...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";
import { getTenantByEmail } from "@/lib/db";
import { getToken } from "next-auth/jwt"; // Importa getToken

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await sql`
            SELECT *
            FROM users
            WHERE email = ${credentials.email}
          `;

          const user = result.rows[0];

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Error during credentials authorization:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (account?.provider === "google") {
          // Verificar si el usuario ya existe llamando a la API
          const checkUserResponse = await fetch(
            `/v1/users/check/?email=${user.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!checkUserResponse.ok) {
            throw new Error("Error al verificar el usuario");
          }

          const { exists } = await checkUserResponse.json();

          if (!exists) {
            // Generar un hash de contraseña temporal
            const tempPassword = Math.random().toString(36).slice(-8);
            const tempPasswordHash = await bcrypt.hash(tempPassword, 10);

            // Si el usuario no existe, lo registramos llamando a la API
            const registerResponse = await fetch(`/v1/users/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                password_hash: tempPasswordHash,
                image: user.image,
              }),
            });

            if (!registerResponse.ok) {
              throw new Error("Error al registrar el usuario");
            }

            const { createdUser } = await registerResponse.json();

            // Asignar el rol 'user' por defecto
            const assignRoleResponse = await fetch(`/v1/user_roles/assign`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: createdUser.id,
                role_id: 2, // 1 = admin, 2 = user
              }),
            });

            if (!assignRoleResponse.ok) {
              throw new Error("Error al asignar el rol al usuario");
            }

            // TODO: Enviar un correo al usuario con instrucciones para cambiar su contraseña temporal
          }
        }

        return true; // Permitir el inicio de sesión
      } catch (error) {
        console.error("Error en el proceso de autenticación:", error);
        return false; // Denegar el inicio de sesión en caso de error
      }
    },
    async redirect({ url, baseUrl }) {
       // Use the default redirect behavior
       return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.email = token.email;
        // Añadir el subdomain del tenant a la sesión
        (session as any).tenantSubdomain = token.tenantSubdomain;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        // Buscar el tenant aquí
        const tenant = await getTenantByEmail(user.email as string);
        if (tenant) {
          token.tenantSubdomain = tenant.subdomain;
        }
      }
      return token;
    },
  },
});

export { authHandler as GET, authHandler as POST };
