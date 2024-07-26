// [...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  pages: {
    signIn: "/login", // Personaliza la página de inicio de sesión si es necesario
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user callback signin");
      console.log(user);

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
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
      // session.accessToken = token.accessToken;
      // session.user.id = token.id;

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
