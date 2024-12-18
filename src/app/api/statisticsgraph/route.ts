import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils";
import {TestModel} from "@/app/lib/models"; // Adjust the import path as necessary

// Interface for the test data
interface Test {
  date: Date;
  marksObtained: number;
  totalMarks: number;
}

interface SubjectData {
  userEmail: string;
  userName: string;
  tests: Test[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { className, userEmail } = await req.json();
    // console.log(className,userEmail)

    // Connect to the database
    await connectToDatabase();

    // Fetch data for the specified class
    const classData = await TestModel.findOne({ class: className });

    if (!classData) {
      return NextResponse.json(
        { message: "Class not found" },
        { status: 404 }
      );
    }

    // Find subject data for the user
    const findSubjectData = (subjectArray: SubjectData[]): SubjectData | undefined =>
      subjectArray.find((entry: SubjectData) => entry.userEmail === userEmail);

    const physicsData = findSubjectData(classData.physics || []);
    const chemistryData = findSubjectData(classData.chemistry || []);
    const mathsData = findSubjectData(classData.maths || []);

    // Calculate percentages for the tests
    const calculatePercentages = (tests: Test[]): { date: Date; percentage: string }[] =>
      tests.map((test: Test) => ({
        date: test.date,
        percentage: ((test.marksObtained / test.totalMarks) * 100).toFixed(2),
      }));

    const response = {
      physics: physicsData ? calculatePercentages(physicsData.tests) : [],
      chemistry: chemistryData ? calculatePercentages(chemistryData.tests) : [],
      maths: mathsData ? calculatePercentages(mathsData.tests) : [],
    };
    // console.log(response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching test data:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
