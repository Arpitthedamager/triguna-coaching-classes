import { NextRequest, NextResponse } from "next/server";
import { Timetable } from "@/app/lib/models"; // Adjust path as needed
import { connectToDatabase } from "@/app/lib/utils";

connectToDatabase();

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { class: classId, icon, name, time } = await req.json();

    if (!classId || !icon || !name || !time || isNaN(classId)) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const timetable = await Timetable.findOneAndUpdate(
      { class: classId },
      { $push: { schedule: { icon, name, time } } },
      { new: true, upsert: true }
    );

    return NextResponse.json(timetable, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { class: classId, index } = await req.json();

    if (!classId || index === undefined || isNaN(classId) || isNaN(index)) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const timetable = await Timetable.findOne({ class: classId });
    if (!timetable) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }

    timetable.schedule.splice(index, 1); // Remove the schedule at the specified index
    await timetable.save();

    return NextResponse.json(timetable, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("class");

    if (!classId || isNaN(Number(classId))) {
      return NextResponse.json({ message: "Invalid classId" }, { status: 400 });
    }

    const timetable = await Timetable.findOne({ class: Number(classId) });
    if (!timetable) {
      return NextResponse.json({ message: "No timetable found for this class" }, { status: 404 });
    }

    return NextResponse.json(timetable, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
