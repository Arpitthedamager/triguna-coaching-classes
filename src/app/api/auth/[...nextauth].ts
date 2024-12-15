import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../lib/utils";
import { User as UserModel } from "../../lib/models";
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
            // Return the user with the updated schema
            return {
              id: user._id.toString(),
              name: user.name || "",
              email: user.email || "",
              phone: user.phone || "",
              address: user.address || "",
              profileImage: user.profileImage || "/default-avatar.jpg",
              role: user.role || "student",
              class: user.class || 0,
              rollNo: user.rollNo || 0,  // Default to 0 if rollNo is null
              subjects: user.subjects || { physics: false, math: false, chemistry: false }, // Default subjects
              recentlyViewed: user.recentlyViewed
                ? user.recentlyViewed.map(view => view.material.toString()) // Only material ID as string
                : [],
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
          rollNo: token.rollNo as number,  // Include rollNo
          subjects: token.subjects as { physics: boolean, math: boolean, chemistry: boolean },  // Include subjects
          recentlyViewed: token.recentlyViewed as string[], // Ensure it's an array of strings (material IDs)
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
        token.rollNo = user.rollNo || 0;  // Default to 0 if rollNo is null
        token.subjects = user.subjects || { physics: false, math: false, chemistry: false };  // Default subjects
        token.recentlyViewed = user.recentlyViewed || [];  // Default to empty array
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;