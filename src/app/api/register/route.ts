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
  subjects: {
    physics: boolean;
    math: boolean;
    chemistry: boolean;
  };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: UserPayload = await req.json();
    const { email, password, role, name, number, address, class: classNumber, subjects } = body;

    // Validate input
    if (
      !email ||
      !password ||
      !name ||
      !number ||
      !role ||
      !address ||
      isNaN(classNumber) ||
      classNumber < 6 ||
      classNumber > 14 ||
      !subjects ||
      typeof subjects.physics !== 'boolean' ||
      typeof subjects.math !== 'boolean' ||
      typeof subjects.chemistry !== 'boolean'
    ) {
      return NextResponse.json({ message: "All fields are required and must be valid" }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate roll number based on the last user's roll number in the same class
    const session = await User.startSession();
    session.startTransaction();

    try {
      // Find the last user in the same class, sorted by rollNo in descending order
      const lastUserInClass = await User.findOne({ class: classNumber }).sort({ rollNo: -1 }).session(session);

      // Generate rollNo: increment the last rollNo or start from 1 if no user exists in the class
      const rollNo = lastUserInClass ? lastUserInClass.rollNo + 1 : 1;

      // Create new user with the generated rollNo
      const newUser = new User({
        email,
        password: hashedPassword,
        role,
        name,
        phone: number,
        address,
        class: classNumber,
        rollNo,
        subjects,
      });

      // Save the new user to the database
      await newUser.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Respond with success
      return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (err) {
      // Abort transaction in case of an error
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({ message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
