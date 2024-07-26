// [...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Personaliza la página de inicio de sesión si es necesario
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Verificar si el usuario ya existe llamando a la API
        const checkUserResponse = await fetch(
          `${process.env.API_URL}/users/check/?email=${user.email}`,
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
          const registerResponse = await fetch(
            `${process.env.API_URL}/users/register`,
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

          const { createdUser } = await registerResponse.json();

          // Asignar el rol 'user' por defecto
          const assignRoleResponse = await fetch(
            `${process.env.API_URL}/user_roles/assign`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: createdUser.id,
                role_id: 1, // 1 = admin, 2 = user
              }),
            }
          );

          if (!assignRoleResponse.ok) {
            throw new Error("Error al asignar el rol al usuario");
          }

          // TODO: Enviar un correo al usuario con instrucciones para cambiar su contraseña temporal
        }

        return true; // Permitir el inicio de sesión
      } catch (error) {
        console.error("Error en el proceso de autenticación:", error);
        return false; // Denegar el inicio de sesión en caso de error
      }
    },
    async redirect({ url, baseUrl }) {
      // Redirige a /dashboard después de un inicio de sesión exitoso
      if (url === "/api/auth/signin") {
        return Promise.resolve("/dashboard");
      }
      // Asegúrate de redirigir correctamente en otros casos
      return Promise.resolve(baseUrl);
    },
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      /*
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      */

      console.log("session", session);

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile.id;
      }
      return token;
    },
  },
});

export { authHandler as GET, authHandler as POST };
