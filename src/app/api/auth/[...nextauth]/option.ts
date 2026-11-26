import { NextAuthOptions } from "next-auth";
import UserModel from "@/src/model/userModel";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/src/library/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email or username");
          }

          if (!user.password) {
            throw new Error("Please login with Google");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await dbConnect();
        try {
          const existingUser = await UserModel.findOne({ email: user.email });

          if (!existingUser) {
            await UserModel.create({
              username: user.name?.replace(/\s+/g, "").toLowerCase() || `user${Date.now()}`,
              Fullname: user.name || "",
              email: user.email || "",
              password: undefined,
              role: "customer",
            });
          }
        } catch (error) {
          console.log("Google SignIn error:", error);
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        const dbUser = await UserModel.findOne({ email: user.email });

        if (dbUser) {
          token._id = dbUser._id.toString();
          token.username = dbUser.username;
          token.role = dbUser.role;
          token.phone = dbUser.phone || null;
          token.Fullname = dbUser.Fullname;
        }
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string | null;
        session.user.Fullname = token.Fullname as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};