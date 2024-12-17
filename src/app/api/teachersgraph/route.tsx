import { NextRequest, NextResponse } from "next/server";

interface Test {
  date: string;
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
    const { className } = await req.json();

    const dummyData: DummyData[] = [
        {
          class: "11",
          physics: [
            {
              userEmail: "student1@gmail.com",
              userName: "Student 1",
              tests: [
                { date: "2023-12-01", marksObtained: 43, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 40, totalMarks: 50 },
                { date: "2024-10-01", marksObtained: 45, totalMarks: 50 },
              ],
            },
            {
              userEmail: "student2@gmail.com",
              userName: "Student 2",
              tests: [
                { date: "2024-12-01", marksObtained: 46, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 42, totalMarks: 50 },
              ],
            },
          ],
          chemistry: [
            {
              userEmail: "student1@gmail.com",
              userName: "Student 1",
              tests: [
                { date: "2024-12-01", marksObtained: 48, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 45, totalMarks: 50 },
              ],
            },
          ],
          maths: [
            {
              userEmail: "student1@gmail.com",
              userName: "Student 1",
              tests: [
                { date: "2024-12-01", marksObtained: 50, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 48, totalMarks: 50 },
              ],
            },
          ],
        },
        {
          class: "12",
          physics: [
            {
              userEmail: "student3@gmail.com",
              userName: "Student 3",
              tests: [
                { date: "2024-12-01", marksObtained: 38, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 41, totalMarks: 50 },
              ],
            },
          ],
          chemistry: [
            {
              userEmail: "student3@gmail.com",
              userName: "Student 3",
              tests: [
                { date: "2024-12-01", marksObtained: 44, totalMarks: 50 },
              ],
            },
          ],
          maths: [
            {
              userEmail: "student3@gmail.com",
              userName: "Student 3",
              tests: [
                { date: "2024-12-01", marksObtained: 49, totalMarks: 50 },
              ],
            },
          ],
        },
        {
          class: "12",
          physics: [
            {
              userEmail: "student4@gmail.com",
              userName: "Student 4",
              tests: [
                { date: "2024-12-01", marksObtained: 39, totalMarks: 50 },
                { date: "2024-11-01", marksObtained: 42, totalMarks: 50 },
                { date: "2024-10-01", marksObtained: 43, totalMarks: 50 },
              ],
            },
          ],
          chemistry: [
            {
              userEmail: "student4@gmail.com",
              userName: "Student 4",
              tests: [
                { date: "2024-12-01", marksObtained: 45, totalMarks: 50 },
              ],
            },
          ],
          maths: [
            {
              userEmail: "student4@gmail.com",
              userName: "Student 4",
              tests: [
                { date: "2024-12-01", marksObtained: 50, totalMarks: 50 },
              ],
            },
          ],
        },
      ];
  

    const classData = dummyData.find((item) => item.class === className);
    // console.log(className);
    
    if (!classData) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }

    const calculateMonthlyAverages = (subject: SubjectData[]) => {
      const monthlyTotals: { [month: string]: { total: number; count: number } } = {};

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
        average: (monthlyTotals[month].total / monthlyTotals[month].count).toFixed(2),
      }));
    };

    const response = {
      physics: calculateMonthlyAverages(classData.physics),
      chemistry: calculateMonthlyAverages(classData.chemistry),
      maths: calculateMonthlyAverages(classData.maths),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching average data:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
