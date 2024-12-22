import { NextResponse } from "next/server";
import { StudyMaterial } from "@/app/lib/models";
import { connectToDatabase } from "@/app/lib/utils";

// GET handler for fetching study materials
export async function GET() {
  await connectToDatabase();

  try {
    const studyMaterials = await StudyMaterial.find();
    return NextResponse.json(studyMaterials, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch study materials" }, { status: 500 });
  }
}

// POST handler for creating a new study material
export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const newMaterial = new StudyMaterial(body);
    await newMaterial.save();
    return NextResponse.json(newMaterial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create study material" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    await connectToDatabase();
  
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }
  
      await StudyMaterial.findByIdAndDelete(id);
      return NextResponse.json({ message: "Study material deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete study material" }, { status: 500 });
    }
  }
  