import { connectToDatabase } from "@/app/lib/utils"; // Utility for DB connection
import { TestModel } from "@/app/lib/models"; // Assuming TestModel is defined correctly
import { ITest } from "@/app/lib/models"; // Ensure ITest is imported
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { className, subject, userName, userEmail } = await req.json();
    console.log(className, subject, userName, userEmail);

    // Validate class name (only allow 9, 10, 11, 12)
    if (!["9", "10", "11", "12"].includes(className)) {
      return NextResponse.json(
        { error: "Invalid class. Only classes 9, 10, 11, and 12 are allowed." },
        { status: 400 }
      );
    }

    if (!className || !subject || !userName || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectToDatabase();

    // Check if the class already exists
    let test = await TestModel.findOne({ class: className });

    // If class not found, create a new one
    if (!test) {
      test = new TestModel({
        class: className,
        physics: [],
        chemistry: [],
        mathematics: [],
      });

      // Save the new class
      await test.save();
    }

    // Ensure the subject exists in ITest
    interface Student {
      userEmail: string;
      userName: string;
      tests: { date: Date; marksObtained: number; totalMarks: number }[]; // Adjust based on your schema
    }

    // Get the subject array dynamically based on the subject
    const subjectArray: Student[] = test[subject.toLowerCase() as keyof ITest];

    // Check if the student with the same email already exists in the subject
    const existingStudent = subjectArray.find(
      (student) => student.userEmail === userEmail
    );

    if (existingStudent) {
      return NextResponse.json(
        { error: "Student with this email already exists in the subject." },
        { status: 400 }
      );
    }

    // Add the student to the subject (with an empty tests array)
    subjectArray.push({ userEmail, userName, tests: [] });

    // Save the updated class document
    await test.save();

    return NextResponse.json({ message: "Student added successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
