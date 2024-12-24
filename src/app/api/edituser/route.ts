import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils";
import { User } from "@/app/lib/models";

export async function PUT(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    if (!body._id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(body._id, body, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Fetch users (optional if you want to load the users in the frontend)
export async function GET(req: Request) {
    try {
      await connectToDatabase();
      const users = await User.find();  // Fetch all users or apply filters here
      return NextResponse.json(users);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }