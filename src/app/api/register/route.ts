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
  address: string;
  class: number;
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("Received POST request for /api/register");

    const body = await req.json();
    console.log("Request body:", body);

    const { email, password, role, name, number, address, class: classString }: UserPayload = body;

    const classNumber = Number(classString); // Convert to number
    if (
      !email ||
      !password ||
      !name ||
      !number ||
      !role ||
      !address ||
      isNaN(classNumber) ||
      classNumber < 6 ||
      classNumber > 14
    ) {
      console.warn("Validation failed:", { email, password, role, name, number, address, classNumber });
      return NextResponse.json({ message: "All fields are required and must be valid" }, { status: 400 });
    }

    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Database connection successful.");

    console.log("Checking for existing user with email:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn("User already exists with email:", email);
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creating new user...");
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      name,
      phone: number,
      address,
      class: classNumber, // Save as a number
    });

    await newUser.save();
    console.log("User created successfully:", newUser);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /register:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }
}
