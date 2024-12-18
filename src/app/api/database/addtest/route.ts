import { connectToDatabase } from "@/app/lib/utils";
import { TestModel } from "@/app/lib/models";
import { NextRequest, NextResponse } from "next/server";

interface ITest {
  class: string;
  physics: Array<{ userEmail: string; userName: string; tests: Array<any> }>;
  chemistry: Array<{ userEmail: string; userName: string; tests: Array<any> }>;
  maths: Array<{ userEmail: string; userName: string; tests: Array<any> }>;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const className = searchParams.get("class");
  const subject = searchParams.get("subject");

  if (!className || !subject) {
    return NextResponse.json(
      { error: "Class and subject are required." },
      { status: 400 }
    );
  }

  if (!["physics", "chemistry", "maths"].includes(subject.toLowerCase())) {
    return NextResponse.json({ error: "Invalid subject." }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const document = await TestModel.findOne({ class: className }).exec() as ITest;

    if (!document) {
      return NextResponse.json(
        { error: "Class not found." },
        { status: 404 }
      );
    }

    // Ensure TypeScript knows 'subject' is a valid key of ITest
    const subjectKey = subject.toLowerCase() as keyof ITest;
    const subjectData = document[subjectKey];

    if (!Array.isArray(subjectData)) {
      return NextResponse.json(
        { error: `Invalid data format for subject ${subject}` },
        { status: 500 }
      );
    }

    const students = subjectData.map(
      ({ userName, userEmail }: { userName: string; userEmail: string }) => ({
        userName,
        userEmail,
      })
    );

    return NextResponse.json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { className, subject, testDate, marks, outOfMarks } = body;

  if (!className || !subject || !testDate || !outOfMarks || !marks) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const classData = await TestModel.findOne({ class: className }).exec() as ITest;

    if (!classData) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    // Ensure TypeScript knows 'subject' is a valid key of ITest
    const subjectKey = subject.toLowerCase() as keyof ITest;
    const subjectData = classData[subjectKey];

    if (!Array.isArray(subjectData)) {
      return NextResponse.json(
        { error: `Invalid data format for subject ${subject}` },
        { status: 500 }
      );
    }

    const errors = [];
    const updatedStudents = [];

    for (const [userEmail, marksObtained] of Object.entries(marks)) {
      const student = subjectData.find(
        (s: { userEmail: string; userName: string }) => s.userEmail === userEmail
      );

      if (!student) {
        errors.push(`Student with email ${userEmail} does not exist in subject ${subject}.`);
      } else {
        student.tests.push({
          date: new Date(testDate),
          marksObtained,
          totalMarks: outOfMarks,
        });
        updatedStudents.push(student);
      }
    }

    if (errors.length > 0) {
      await TestModel.updateOne(
        { class: className },
        { $set: { [subjectKey]: subjectData } },
        { new: true }
      );

      return NextResponse.json({ errors }, { status: 400 });
    }

    await TestModel.updateOne(
      { class: className },
      { $set: { [subjectKey]: subjectData } },
      { new: true }
    );

    return NextResponse.json({ message: "Test data added successfully" });
  } catch (error) {
    console.error("Error adding test data:", error);
    return NextResponse.json({ error: "Failed to add test data" }, { status: 500 });
  }
}
