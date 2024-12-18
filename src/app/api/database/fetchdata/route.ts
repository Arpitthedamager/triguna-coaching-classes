import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils";
import { TestModel } from "@/app/lib/models";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all class data
    const data = await TestModel.find();

    // Respond with the fetched data
    return NextResponse.json({ success: true, data });
  } catch (error) {
    // Handle the error properly
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}
