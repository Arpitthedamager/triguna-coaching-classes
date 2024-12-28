import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils"; // Adjust path to where your utils are
import { TestPaperClass } from "@/app/lib/models"; // Adjust path to where your models are

// Fetch all Test Papers
export async function GET(req: Request) {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Parse query parameters
      const url = new URL(req.url);
      const classParam = url.searchParams.get("class");
      const subjectParams = url.searchParams.getAll("subject"); // Get all subject values
  
      // Build the query object for filtering
      const query: any = {};
  
      if (classParam) {
        query.class = Number(classParam); // Convert class to number
      }
  
      // If subjects are provided, we use $in to match any of the subjects
      if (subjectParams.length > 0) {
        query.subject = { $in: subjectParams };
      }
  
      // Fetch test papers based on the query
      const testPapers = await TestPaperClass.find(query);
  console.log(testPapers);
      // Return the filtered list of test papers as JSON
      return NextResponse.json(testPapers);
    } catch (error) {
      console.error("Error fetching test papers:", error);
      return NextResponse.json({ error: "Failed to fetch test papers" }, { status: 500 });
    }
  }
  

// Create a new Test Paper
export async function POST(req: Request) {
    try {
      const data = await req.json();
      console.log(data);
  
      // Validate the incoming data
      if (!data.title || !data.subject || !data.class) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      // Check if the class and subject already exist in the database
      const existingTestPaper = await TestPaperClass.findOne({
        class: data.class,
        subject: data.subject,
      });
  
      const newTestPaper = {
        id: Date.now(),
        title: data.title,
        description: data.description || "",
        teacher: data.teacher || "",
        image: data.image || "",
        downloadLink: data.downloadLink || "",
        openLink: data.openLink || "",
        dateAdded: new Date(), // Add dateAdded field
      };
  
      if (existingTestPaper) {
        // If the test paper exists, add the new paper to the testPapers array
        existingTestPaper.testPapers.push(newTestPaper);
  
        // Save the updated document
        await existingTestPaper.save();
  
        return NextResponse.json({ message: "Test Paper added to existing class and subject" }, { status: 200 });
      } else {
        // If no document exists, create a new one
        const newTestPaperDocument = new TestPaperClass({
          class: data.class,
          subject: data.subject,
          testPapers: [newTestPaper], // Add the test paper to the array
        });
  
        // Save the new document
        await newTestPaperDocument.save();
  
        return NextResponse.json({ message: "Test Paper added successfully" }, { status: 201 });
      }
    } catch (error) {
      console.error("Error adding test paper:", error);
      return NextResponse.json({ error: "Failed to add test paper" }, { status: 500 });
    }
  }
  
// Delete a Test Paper by ID
export async function DELETE(req: Request) {
    try {
      const { id } = await req.json(); // Extract ID from request body
  
      if (!id) {
        return NextResponse.json({ error: "Missing test paper ID" }, { status: 400 });
      }
  
      await connectToDatabase();
  
      const deletedTestPaper = await TestPaperClass.findOneAndUpdate(
        { "testPapers.id": id },
        { $pull: { testPapers: { id } } },
        { new: true } // Return updated document after modification
      );
  
      if (!deletedTestPaper) {
        return NextResponse.json({ error: "Test paper not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Test Paper deleted successfully" });
    } catch (error) {
      console.error("Error deleting test paper:", error);
      return NextResponse.json({ error: "Failed to delete test paper" }, { status: 500 });
    }
  }
  