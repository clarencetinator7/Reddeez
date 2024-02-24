import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const resData = await res.json();

        if (res.ok && resData.success) {
          return resData;
        } else {
          throw new Error(JSON.stringify(resData));
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.token;
        token.id = user.user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.token = token.accessToken;
      }

      return session;
    },
  },
};
