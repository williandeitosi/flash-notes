import type { NoteType } from "../../../../../packages/models/note-schema";
import { db } from "../../../prisma/db";

export class NoteService {
  async createNote(userId: number, { title, description }: NoteType) {
    const lowerTitle = title.toLowerCase();
    const titleExists = await db.note.findFirst({
      where: {
        title: lowerTitle,
        userId,
      },
    });

    if (titleExists) {
      throw new Error("Title already exists!");
    }

    const newNote = await db.note.create({
      data: { title: lowerTitle, description, userId },
    });

    return newNote;
  }

  async getllAllNotes(userId: number) {
    return await db.note.findMany({ where: { userId } });
  }
}
