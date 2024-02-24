import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    user: {
      id: string;
      displayName: string;
      username: string;
      email: string;
      avatar: string;
    };
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    accessToken: string;
  }
}
