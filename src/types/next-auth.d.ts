import NextAuth, { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  // Extending the User interface to include custom fields
  interface User extends DefaultUser {
    id: string;
    phone: string;
    address: string;
    profileImage: string;
    role: string;
    class: number;
    recentlyViewed: string[]; // Array of recently viewed materials
  }

  // Extending the Session interface to include custom fields
  interface Session extends DefaultSession {
    user: User; // Make sure the session includes all the custom user properties
  }
}
