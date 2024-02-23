import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const handler = NextAuth({
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
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const { user: userData, token: userToken }: any = user;
      if (user) {
        token.user = userData;
        token.accessToken = userToken;
      }
      return token;
    },
  },
});
export { handler as GET, handler as POST };
