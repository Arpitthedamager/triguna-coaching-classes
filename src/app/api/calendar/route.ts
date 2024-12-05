import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/app/lib/utils';  // Adjust this path as needed
import { CalendarEvent } from '@/app/lib/models'; // Adjust this path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    switch (req.method) {
      case 'GET': {
        const { classLevel } = req.query;

        if (!classLevel || ![9, 10, 11, 12].includes(Number(classLevel))) {
          return res.status(400).json({ error: 'Invalid or missing class level.' });
        }

        const events = await CalendarEvent.find({ classLevel: Number(classLevel) });
        return res.status(200).json(events);
      }

      case 'POST': {
        const { classLevel, dates } = req.body;

        if (!classLevel || !dates || ![9, 10, 11, 12].includes(classLevel)) {
          return res.status(400).json({ error: 'Invalid data provided.' });
        }

        const newEvent = new CalendarEvent({ classLevel, dates });
        await newEvent.save();
        return res.status(201).json({ message: 'Event created successfully!' });
      }

      case 'PUT': {
        const { id, dates } = req.body;

        if (!id || !dates) {
          return res.status(400).json({ error: 'Invalid data provided.' });
        }

        const updatedEvent = await CalendarEvent.findByIdAndUpdate(
          id,
          { dates },
          { new: true }
        );

        if (!updatedEvent) {
          return res.status(404).json({ error: 'Event not found.' });
        }

        return res.status(200).json({ message: 'Event updated successfully!', updatedEvent });
      }

      case 'DELETE': {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ error: 'Invalid data provided.' });
        }

        const deletedEvent = await CalendarEvent.findByIdAndDelete(id);

        if (!deletedEvent) {
          return res.status(404).json({ error: 'Event not found.' });
        }

        return res.status(200).json({ message: 'Event deleted successfully!' });
      }

      default:
        return res.status(405).json({ error: 'Method not allowed.' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
