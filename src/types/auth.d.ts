import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      isVerified: boolean;
      role: string;
      phone?: string | null;
      Fullname?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id?: string;
    isVerified?: boolean;
    role?: string;
    phone?: string;
    Fullname?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    role?: string;
    phone?: string | null;
    Fullname?: string;
  }
}