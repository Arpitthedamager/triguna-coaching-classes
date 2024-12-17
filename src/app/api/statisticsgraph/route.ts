import { NextRequest, NextResponse } from "next/server";
// Import your database connection and model when ready
// import { connectToDatabase } from "@/app/lib/utils";
// import {TestModel} from "@/app/lib/models";

// Interface for the test data
interface Test {
  date: string; // ISO date string
  marksObtained: number;
  totalMarks: number;
}

interface SubjectData {
  userEmail: string;
  userName: string;
  tests: Test[];
}

interface DummyData {
  class: string;
  physics: SubjectData[];
  chemistry: SubjectData[];
  maths: SubjectData[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
      const { className, userEmail } = await req.json();
  
      console.log("Incoming className:", className);
      console.log("Incoming userEmail:", userEmail);
       // ----------------------------- NOTE -----------------------------
    // When you connect to the database, replace this dummyData with real data:
    // 1. Uncomment the `await connectToDatabase();` line below.
    // 2. Use `TestModel.find()` or equivalent to fetch data from MongoDB.
    // ----------------------------------------------------------------

    /*
    // Example of real database connection and query:
    await connectToDatabase();
    const data = await TestModel.find({ class: className, "tests.userEmail": userEmail });
    */
  
      // Dummy data simulating database structure
      const dummyData: DummyData[] = [
        {
          class: "11",
          physics: [
            {
              userEmail: "moneymatrix390@gmail.com",
              userName: "John Doe",
              tests: [
                { date: "2024-12-01", marksObtained: 43, totalMarks: 50 },
                { date: "2025-1-01", marksObtained: 44, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 48, totalMarks: 50 },
                { date: "2024-11-04", marksObtained: 27, totalMarks: 50 },
                { date: "2024-11-24", marksObtained: 37, totalMarks: 50 },
                { date: "2024-12-20", marksObtained: 24, totalMarks: 50 },
                { date: "2024-12-10", marksObtained: 42, totalMarks: 50 },
              ],
            },
          ],
          chemistry: [
            {
              userEmail: "moneymatrix390@gmail.com",
              userName: "John Doe",
              tests: [
                { date: "2024-12-01", marksObtained: 47, totalMarks: 50 },
                { date: "2025-1-01", marksObtained: 47, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 47, totalMarks: 50 },
                { date: "2024-11-04", marksObtained: 27, totalMarks: 50 },
                { date: "2024-11-24", marksObtained: 47, totalMarks: 50 },
                { date: "2024-12-20", marksObtained: 24, totalMarks: 50 },
                { date: "2024-12-10", marksObtained: 42, totalMarks: 50 },
              ],
            },
          ],
          maths: [
            {
              userEmail: "moneymatrix390@gmail.com",
              userName: "John Doe",
              tests: [
                { date: "2024-12-01", marksObtained: 47, totalMarks: 50 },
                { date: "2025-1-01", marksObtained: 47, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 47, totalMarks: 50 },
                { date: "2024-11-04", marksObtained: 27, totalMarks: 50 },
                { date: "2024-11-24", marksObtained: 17, totalMarks: 50 },
                { date: "2024-12-20", marksObtained: 24, totalMarks: 50 },
                { date: "2024-12-10", marksObtained: 42, totalMarks: 50 },
              ],
            },
          ],
        },
      ];
  
      // Ensure className is compared as a string
      const filteredData = dummyData.find((item) => item.class === className.toString());
  
      if (!filteredData) {
        console.log("Class not found in dummy data");
        return NextResponse.json(
          { message: "Class not found" },
          { status: 404 }
        );
      }
  
      const findSubjectData = (subject: SubjectData[]) =>
        subject.find((entry) => entry.userEmail === userEmail);
  
      const physicsData = findSubjectData(filteredData.physics);
      const chemistryData = findSubjectData(filteredData.chemistry);
      const mathsData = findSubjectData(filteredData.maths);
  
      const calculatePercentages = (tests: Test[]) =>
        tests.map((test) => ({
          date: test.date,
          percentage: ((test.marksObtained / test.totalMarks) * 100).toFixed(2),
        }));
  
      const response = {
        physics: physicsData ? calculatePercentages(physicsData.tests) : [],
        chemistry: chemistryData ? calculatePercentages(chemistryData.tests) : [],
        maths: mathsData ? calculatePercentages(mathsData.tests) : [],
      };
  
      return NextResponse.json(response);
    } catch (error) {
      console.error("Error fetching test data:", error);
      return NextResponse.json(
        { message: "Server Error" },
        { status: 500 }
      );
    }
  }
  