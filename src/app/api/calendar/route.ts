import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils"; // Adjust the path as needed
import { CalendarModel } from "@/app/lib/models"; // Adjust the path as needed

// GET: Fetch all events for a specific class
export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
      await connectToDatabase(); // Ensure the database is connected
      const { searchParams } = new URL(req.url);
      const className = searchParams.get("className");
  
      if (!className || !["9", "10", "11", "12"].includes(className)) {
        return NextResponse.json(
          { success: false, error: "Invalid or missing className. Use '9', '10', '11', or '12'." },
          { status: 400 }
        );
      }
  
      // Fetch events for the given class
      const calendar = await CalendarModel.findOne({ className }, { events: 1, _id: 0 });
  
      if (!calendar) {
        return NextResponse.json(
          { success: false, error: `No class found with name: ${className}` },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true, data: calendar.events });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
    }
  }
  

  export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
      // console.log("Received request:", req.url); // Log the incoming request URL
      const body = await req.json();
      // console.log("Request body:", body); // Log the body to ensure it's correct
  
      const { className, event } = body;
  
      if (!className || !event || !event.date || !event.subjects) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid data. Provide className and event with date and subjects.",
          },
          { status: 400 }
        );
      }
  
      // Check if the class exists, if not create it
      let calendar = await CalendarModel.findOne({ className });
  
      if (!calendar) {
        // console.log(`Class ${className} not found. Creating new class.`);
        // Create a new class if it doesn't exist
        calendar = await CalendarModel.create({
          className,
          events: [],
        });
      }
  
      // Add the event to the class
      // console.log(`Adding event to class ${className}:`, event);
      calendar.events.push(event);
      await calendar.save();
  
      return NextResponse.json(
        { success: true, data: calendar },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error("Error during POST request:", error); // Log the error
      if (error instanceof Error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { success: false, error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
    
  
// DELETE: Delete a specific event for a class
export async function DELETE(req: NextRequest): Promise<NextResponse> {
    try {
      await connectToDatabase(); // Ensure the database is connected
      const { searchParams } = new URL(req.url);
      const className = searchParams.get("className");
      const eventDate = searchParams.get("eventDate"); // The date of the event to delete
  
      // Validate className and eventDate
      if (!className || !["9", "10", "11", "12"].includes(className)) {
        return NextResponse.json(
          { success: false, error: "Invalid or missing className. Use '9', '10', '11', or '12'." },
          { status: 400 }
        );
      }
  
      if (!eventDate) {
        return NextResponse.json({ success: false, error: "Missing eventDate parameter." }, { status: 400 });
      }
  
      // Find the class and remove the specific event by date
      const result = await CalendarModel.findOneAndUpdate(
        { className, "events.date": eventDate },
        { $pull: { events: { date: eventDate } } }, // Remove event with the specified date
        { new: true } // Return the updated document
      );
  
      if (!result) {
        return NextResponse.json(
          { success: false, error: `No event found for class: ${className} with date: ${eventDate}` },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        message: `Event on ${eventDate} deleted successfully.`,
        data: result.events, // Return the updated events for the class
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
    }
  }
  