import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/utils";
import { User as UserModel } from "../../../lib/models";

const authOptions = {
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
              name: user.name || null,  // Ensure name is null if not available
              email: user.email || "",
              phone: user.phone || "",
              address: user.address || "",
              profileImage: user.profileImage || "/default-avatar.jpg",
              role: user.role || "student",
              class: user.class || 0,
              rollNo: user.rollNo || 0,
              subjects: user.subjects || { physics: false, math: false, chemistry: false },
              recentlyViewed: user.recentlyViewed
                ? user.recentlyViewed.map((view) => view.material.toString())
                : [],
              createdAt: user.createdAt, // Add createdAt here
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
          name: token.name ?? null,  // Ensure name is string | null (use null if undefined)
          email: token.email,
          phone: token.phone,
          address: token.address,
          profileImage: token.profileImage,
          role: token.role,
          class: token.class,
          rollNo: token.rollNo,
          subjects: token.subjects,
          recentlyViewed: token.recentlyViewed,
          createdAt: token.createdAt, // Pass createdAt to the session
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? null;  // Ensure name is string | null (use null if undefined)
        token.email = user.email;
        token.phone = user.phone;
        token.address = user.address;
        token.profileImage = user.profileImage;
        token.role = user.role;
        token.class = user.class;
        token.rollNo = user.rollNo || 0;
        token.subjects = user.subjects || { physics: false, math: false, chemistry: false };
        token.recentlyViewed = user.recentlyViewed || [];
        token.createdAt = user.createdAt; // Add createdAt to the token
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
    async redirect({ url, baseUrl }) {
      const role = session?.user?.role; // Get the user role from session

      if (role === "admin") {
        console.log("Redirecting to admin dashboard");
        return "/admindashboard"; // Redirect admin to admin dashboard
      } else {
        console.log("Redirecting to admin dashboard");
        return "/userdashboard"; // Redirect user to user dashboard
      }
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
