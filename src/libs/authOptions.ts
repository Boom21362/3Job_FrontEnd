
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        const response = await userLogin(credentials.email, credentials.password);
      
        if (response && response.success && response.token) {
          const userObj = response.data || {};
          return {
            id: userObj._id || userObj.id || "temp-id",
            name: userObj.name || credentials.email.split('@')[0],
            email: userObj.email || credentials.email,
            role: userObj.role || "user",
            accessToken: response.token
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/',
    error: '/auth/signin',
  },
  session: { 
    strategy: "jwt" 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  }
};