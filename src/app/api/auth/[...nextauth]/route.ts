// [...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getTenantByEmail } from "@/db/tenants";
import { getUserByEmail, existsUser, createUser } from "@/db/users";
import { assignUserRole } from "@/db/user_roles";

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
          const user = await getUserByEmail(credentials.email);

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
          const exists = await existsUser(user.email as string);

          if (!exists) {
            // Generar un hash de contraseña temporal
            const tempPassword = Math.random().toString(36).slice(-8);
            const tempPasswordHash = await bcrypt.hash(tempPassword, 10);

            // Crear el usuario en la base de datos
            const createdUser = await createUser(
              user.email as string,
              tempPasswordHash,
              user.name as string,
              user.image as string
            );

            // 1 = admin, 2 = user
            await assignUserRole(createdUser.id, 1);

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
