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
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              profileImage: user.profileImage,
              role: user.role,
              class: user.class,
              recentlyViewed: user.recentlyViewed || [],
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
          id: token.id,
          name: token.name,
          email: token.email,
          phone: token.phone,
          address: token.address,
          profileImage: token.profileImage,
          role: token.role,
          class: token.class,
          recentlyViewed: token.recentlyViewed || [],
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
        token.recentlyViewed = user.recentlyViewed;
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
