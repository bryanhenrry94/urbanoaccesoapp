// [...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login',  // Personaliza la página de inicio de sesión si es necesario
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige a /dashboard después de un inicio de sesión exitoso
      if (url === '/api/auth/signin') {
        return Promise.resolve('/dashboard');
      }
      // Asegúrate de redirigir correctamente en otros casos
      return Promise.resolve(baseUrl);
    },
  },
});

export { authHandler as GET, authHandler as POST };
