// [...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sql } from '@vercel/postgres';
import { getSession } from "next-auth/react";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await sql`
            SELECT u.*, t.subdomain
            FROM users u
            JOIN tenants t ON u.tenant_id = t.id
            WHERE u.email = ${credentials.email}
          `;

          const user = result.rows[0];

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            tenantSubdomain: user.subdomain,
          };
        } catch (error) {
          console.error('Error during credentials authorization:', error);
          return null;
        }
      }
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
        if (account?.provider === 'google') {
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

          const { exists, tenantSubdomain } = await checkUserResponse.json();

          if (!exists) {
            // Generar un hash de contraseña temporal
            const tempPassword = Math.random().toString(36).slice(-8);
            const tempPasswordHash = await bcrypt.hash(tempPassword, 10);

            // Si el usuario no existe, lo registramos llamando a la API
            const registerResponse = await fetch(
              `/v1/users/register`,
              {
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
              }
            );

            if (!registerResponse.ok) {
              throw new Error("Error al registrar el usuario");
            }

            const { createdUser, tenantSubdomain: newTenantSubdomain } = await registerResponse.json();

            // Asignar el rol 'user' por defecto
            const assignRoleResponse = await fetch(
              `/v1/user_roles/assign`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user_id: createdUser.id,
                  role_id: 2, // 1 = admin, 2 = user
                }),
              }
            );

            if (!assignRoleResponse.ok) {
              throw new Error("Error al asignar el rol al usuario");
            }

            // TODO: Enviar un correo al usuario con instrucciones para cambiar su contraseña temporal
            
            if ('tenantSubdomain' in user) {
              user.tenantSubdomain = newTenantSubdomain;
            } else {
              (user as any).tenantSubdomain = newTenantSubdomain;
            }
          } else {
            if ('tenantSubdomain' in user) {
              user.tenantSubdomain = tenantSubdomain;
            } else {
              (user as any).tenantSubdomain = tenantSubdomain;
            }
          }
        }

        return true; // Permitir el inicio de sesión
      } catch (error) {
        console.error("Error en el proceso de autenticación:", error);
        return false; // Denegar el inicio de sesión en caso de error
      }
    },
    async redirect({ url, baseUrl }) {
      // Redirige a /dashboard después de un inicio de sesión exitoso
      // tanto para credenciales como para Google
      if (url.startsWith("/api/auth/callback") || url === "/api/auth/signin") {
        return Promise.resolve("/dashboard");
      }
     
      // Asegúrate de redirigir correctamente en otros casos
      return Promise.resolve(baseUrl);
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        (session.user as any).id = token.sub;
      }
      if (token.tenantSubdomain && session.user) {
        (session.user as any).tenantSubdomain = token.tenantSubdomain;
      }
      
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        if ('tenantSubdomain' in user) {
          token.tenantSubdomain = user.tenantSubdomain;
        } else {
          token.tenantSubdomain = (user as any).tenantSubdomain;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});

export { authHandler as GET, authHandler as POST };
