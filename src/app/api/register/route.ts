import { connectToDatabase } from "../../lib/utils";
import { User } from "../../lib/models";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface UserPayload {
  email: string;
  password: string;
  role: string;
  name: string;
  number: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, role, name, number }: UserPayload = await req.json();

    if (!email || !password || !name || !number) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role, name, number });

    await newUser.save();
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /register:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }
}
