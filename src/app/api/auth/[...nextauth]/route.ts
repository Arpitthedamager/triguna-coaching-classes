import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/utils";
import { User as UserModel } from "../../../lib/models";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await connectToDatabase();

        const user = await UserModel.findOne({ email: credentials.username }).lean();
        if (user) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid) {
            // Return the user, extracting material from recentlyViewed as a string array
            return {
              id: user._id.toString(),
              name: user.name || "",
              email: user.email || "",
              phone: user.phone || "",
              address: user.address || "",
              profileImage: user.profileImage || "/default-avatar.jpg",
              role: user.role || "student",
              class: user.class || 0,
              recentlyViewed: user.recentlyViewed ? user.recentlyViewed.map(view => view.material.toString()) : [], // Extracting only material as string
            };
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          phone: token.phone as string,
          address: token.address as string,
          profileImage: token.profileImage as string,
          role: token.role as string,
          class: token.class as number,
          recentlyViewed: token.recentlyViewed as string[], // Ensure it's an array of strings
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.address = user.address;
        token.profileImage = user.profileImage;
        token.role = user.role;
        token.class = user.class;
        token.recentlyViewed = user.recentlyViewed; // Will be a string array
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
