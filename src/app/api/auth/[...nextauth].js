// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { connectToDatabase } from "@/app/lib/util";
// import { User } from "@/app/lib/models";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Credentials received:", credentials);

//         await connectToDatabase();

//         const user = await User.findOne({ email: credentials.username });
//         if (user) {
//           const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//           if (isPasswordValid) {
//             console.log("User authorized:", user);
//             return { id: user._id, name: user.name, role: user.role };
//           }
//           console.log("Invalid password");
//         } else {
//           console.log("User not found");
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (token) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/signin",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
