import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add role to session.user
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // Add role to User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // Add role to JWT
  }
}
