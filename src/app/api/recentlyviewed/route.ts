import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils";
import { RecentlyView } from "@/app/lib/models";

export async function GET() {
  try {
    await connectToDatabase();
    const recentlyViewed = await RecentlyView.find().populate("materialId");
    return NextResponse.json(recentlyViewed);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recently viewed materials" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    console.log("Incoming request to save recently viewed material");

    const { materialId, email } = await req.json();
    // console.log("Parsed request body:", { materialId, email });

    // Validate input
    if (!materialId || !email) {
      console.warn("Validation failed: Material ID or email is missing");
      return NextResponse.json(
        { error: "Material ID and email are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    console.log("Connected to MongoDB");

    // Check if the record exists for the same material and user
    const existingRecord = await RecentlyView.findOne({ materialId, email });
    // console.log("Existing record check:", existingRecord);

    if (existingRecord) {
      // Update visitedDate if record exists
      // console.log("Updating visitedDate for existing record");
      existingRecord.visitedDate = new Date();
      await existingRecord.save();
      // console.log("Updated record:", existingRecord);
      return NextResponse.json(existingRecord, { status: 200 });
    }

    // Create a new record if no match is found
    // console.log("No existing record found. Creating a new one.");
    const newRecord = new RecentlyView({ materialId, email, visitedDate: new Date() });
    await newRecord.save();
    // console.log("New record created:", newRecord);

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("Failed to save recently viewed material:", error);
    return NextResponse.json(
      { error: "Failed to save recently viewed material" },
      { status: 500 }
    );
  }
}
