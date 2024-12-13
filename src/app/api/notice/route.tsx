import { NextRequest, NextResponse } from "next/server";
import { Notice } from "@/app/lib/models";
import { connectToDatabase } from "@/app/lib/utils";

// Ensure database connection
connectToDatabase();

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { classId, title, author, image, link } = await req.json(); // Include link in the request body

    // Validate the input data
    if (!classId || !title || !author || isNaN(classId)) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const session = await Notice.startSession();
    session.startTransaction();

    try {
      let notice = await Notice.findOne({ class: classId }).session(session);
      if (!notice) {
        notice = new Notice({
          class: classId,
          notices: [],
        });
      }

      // Push the new notice with link to the notices array
      notice.notices.push({ title, author, image, link }); // Add link here
      await notice.save({ session });

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({ message: "Notice added successfully" }, { status: 201 });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("POST Error:", errorMessage);
    return NextResponse.json({ message: "Internal Server Error", error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { classId, noticeTitle } = await req.json();

    // Validate the input data
    if (!classId || !noticeTitle || isNaN(classId)) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const session = await Notice.startSession();
    session.startTransaction();

    try {
      const notice = await Notice.findOne({ class: classId }).session(session);
      if (!notice) {
        return NextResponse.json({ message: "Class not found" }, { status: 404 });
      }

      // Remove the notice with the matching title
      notice.notices = notice.notices.filter((n) => n.title !== noticeTitle);
      await notice.save({ session });

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({ message: "Notice removed successfully" }, { status: 200 });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("DELETE Error:", errorMessage);
    return NextResponse.json({ message: "Internal Server Error", error: errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    // Validate classId
    if (!classId || isNaN(Number(classId))) {
      return NextResponse.json({ message: "Invalid classId" }, { status: 400 });
    }

    const notice = await Notice.findOne({ class: Number(classId) });
    if (!notice) {
      return NextResponse.json({ message: "No notices found for this class" }, { status: 404 });
    }

    return NextResponse.json({ notices: notice.notices }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("GET Error:", errorMessage);
    return NextResponse.json({ message: "Internal Server Error", error: errorMessage }, { status: 500 });
  }
}
