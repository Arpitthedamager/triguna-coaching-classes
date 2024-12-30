import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils";
import { TestModel } from "@/app/lib/models"; // Adjust the import path as necessary

interface Test {
  date: string | Date;
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
    const { className } = await req.json();

    // Connect to the database
    await connectToDatabase();

    // Fetch class data from the database
    const classData = await TestModel.findOne({ class: className });

    if (!classData) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }

    const calculateMonthlyAverages = (subject: SubjectData[]) => {
      const monthlyTotals: {
        [month: string]: { total: number; count: number };
      } = {};

      subject.forEach((student) => {
        student.tests.forEach((test) => {
          const testMonth = new Date(test.date).toLocaleString("default", {
            month: "long",
            year: "numeric",
          });

          if (!monthlyTotals[testMonth]) {
            monthlyTotals[testMonth] = { total: 0, count: 0 };
          }

          const percentage = (test.marksObtained / test.totalMarks) * 100;
          monthlyTotals[testMonth].total += percentage;
          monthlyTotals[testMonth].count += 1;
        });
      });

      return Object.keys(monthlyTotals).map((month) => ({
        month,
        average: (
          monthlyTotals[month].total / monthlyTotals[month].count
        ).toFixed(2),
      }));
    };

    const response = {
      physics: calculateMonthlyAverages(classData.physics || []),
      chemistry: calculateMonthlyAverages(classData.chemistry || []),
      maths: calculateMonthlyAverages(classData.maths || []),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching average data:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
