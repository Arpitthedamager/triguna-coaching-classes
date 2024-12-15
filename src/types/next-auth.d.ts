// next-auth.d.ts
import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    phone: string;
    address: string;
    profileImage: string;
    role: string;
    class: number;
    rollNo: number | null; // Allow null for rollNo
    recentlyViewed: string[];
    subjects: {
      physics: boolean;
      math: boolean;
      chemistry: boolean;
    };
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
