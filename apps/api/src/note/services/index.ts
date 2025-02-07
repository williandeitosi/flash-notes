import type { NoteType } from "../../../../../packages/models/note-schema";
import { db } from "../../../prisma/db";

export class NoteService {
  private async findByTitle(title: string, userId: number) {
    const lowerTitle = title.toLowerCase();
    const findTitle = await db.note.findFirst({
      where: {
        title: lowerTitle,
        userId,
      },
    });
    return { findTitle, lowerTitle };
  }

  async createNote(userId: number, { title, description }: NoteType) {
    const { findTitle, lowerTitle } = await this.findByTitle(title, userId);

    if (findTitle) {
      throw new Error("Title already exists!");
    }

    const newNote = await db.note.create({
      data: { title: lowerTitle, description, userId },
    });

    return newNote;
  }

  async getAllNotes(userId: number) {
    return await db.note.findMany({ where: { userId } });
  }

  async getNote(noteId: number, userId: number) {
    return await db.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });
  }

  async updateNote(
    userId: number,
    noteId: number,
    description: string,
    title: string
  ) {
    const update = await db.note.update({
      where: { userId, id: noteId },
      data: { title, description },
    });

    return update;
  }
}
