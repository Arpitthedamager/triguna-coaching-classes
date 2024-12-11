import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/app/lib/utils";
import { Timetable } from "../../lib/models";

// Define a type for the request body
interface TimetableRequestBody {
  class: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { class: userClass } = req.body as TimetableRequestBody; // Type assertion for the request body

    if (!userClass) {
      return res.status(400).json({ error: "Class is required" });
    }

    try {
      const timetable = await Timetable.findOne({ class: userClass });
      if (!timetable) {
        return res.status(404).json({ error: "Timetable not found for this class" });
      }
      res.status(200).json(timetable);
    } catch (error) {
      console.error("Error fetching timetable:", error);
      res.status(500).json({ error: "Failed to fetch timetable data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
