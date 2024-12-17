import { connectToDatabase } from "@/app/lib/utils"; // Utility for DB connection
import { TestModel } from "@/app/lib/models"; // Assuming TestModel is defined correctly
import { ITest } from "@/app/lib/models"; // Ensure ITest is imported
import { NextRequest, NextResponse } from "next/server";

// Add test for a specified class and subject
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { className, subject, testDate, marks, outOfMarks } = await req.json();

    if (!className || !subject || !testDate || !marks || outOfMarks === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectToDatabase();

    const test = await TestModel.findOne({ class: className });

    if (!test) {
      return NextResponse.json(
        { error: "Class not found" },
        { status: 404 }
      );
    }

    // Ensure the subject exists in ITest
    const subjectArray = test[subject.toLowerCase() as keyof ITest];

    subjectArray.forEach((student: { userEmail: string; userName: string; tests: any[] }) => {
      const studentMarks = marks[student.userEmail];
      if (studentMarks !== undefined) {
        student.tests.push({
          date: new Date(testDate),
          marksObtained: studentMarks,
          totalMarks: outOfMarks,
        });
      }
    });

    await test.save();

    return NextResponse.json({ message: "Test added successfully" });
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
