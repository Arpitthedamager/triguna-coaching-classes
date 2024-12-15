import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/lib/models"; // Adjust path as needed
import { connectToDatabase } from "@/app/lib/utils";

connectToDatabase(); // Ensure the database connection is established

// GET: Fetch user profile by email
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Update user profile by email
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, ...updatedData } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOneAndUpdate({ email }, updatedData, { new: true });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
