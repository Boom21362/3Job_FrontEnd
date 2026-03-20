import NextAuth from "next-auth";
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
        console.log("--- [AUTH] Step 1: Credentials received ---", credentials?.email);

        if (!credentials) {
          console.log("--- [AUTH] Error: Missing email or password ---");
          return null};
        
        const response = await userLogin(credentials.email, credentials.password);

        console.log("--- [AUTH] Step 2: Backend Response ---", response);
      
      if (response && response.success && response.token) {
    // If backend doesn't send 'data', we use what we have
    console.log("--- [AUTH] Step 3: Login Success, building user object ---");
    const userObj = response.data;

    if (!userObj) {
        console.error("Login successful but 'data' object is missing from backend response!");
    }
    
    return {
      id: userObj._id || userObj.id || "temp-id",
      name: userObj.name || credentials.email.split('@')[0],
      email: userObj.email || credentials.email,
      role: userObj.role || "user",
      accessToken: response.token
    };
  }else{
    console.log("--- [AUTH] Step 4: Backend rejected credentials ---", response?.msg);
    return null;
  }
}
    })
  ],
  pages: {
    signIn: '/',
    error: '/auth/signin', // Optional: redirects back to signin on error
  },
  session: { 
    strategy: "jwt" 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };