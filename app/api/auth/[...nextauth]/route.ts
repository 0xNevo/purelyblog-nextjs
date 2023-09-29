import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import User from "@/lib/models/user.model";

type MyCredentials = { email: string; password: string };

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "text",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials: MyCredentials | undefined) {
        if (!credentials) return null;
        const { email, password } = credentials;
        try {
          await connectToDB();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("Email or password is incorrect");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Email or password is incorrect");
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        token.name = session.name;
        token.username = session.username;
        token.image = session.image;
        token.bio = session.bio;
      }
      return token;
    },
    async session({ session, token, user }) {
      try {
        connectToDB();

        const user = await User.findOne({ email: token.email });

        const { id, username, image, bio } = user;
        return {
          ...session,
          user: {
            ...session.user,
            id,
            username,
            bio,
            image,
          },
        };
      } catch (err) {
        console.log(err);
      }

      return session;
    },
    async signIn({ profile, account, user }) {
      if (account?.provider === "credentials") return true;
      try {
        await connectToDB();

        const isUserByCredentialsExist = await User.findOne({
          email: profile?.email,
          password: { $ne: null || undefined },
        });

        if (isUserByCredentialsExist) return false;

        const isUserByProfileExist = await User.findOne({
          email: profile?.email,
        });

        if (!isUserByProfileExist) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            image: profile?.picture || profile?.avatar_url,
            username: profile?.email?.split("@")[0],
          });
        }

        return true;
      } catch (err: any) {
        console.log(err);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
