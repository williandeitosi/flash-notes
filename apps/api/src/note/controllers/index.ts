import type { Request, Response } from "express";
import type { NoteService } from "../services";
import { handleError, parseIds } from "../utils";
import { noteSchema } from "./../../../../../packages/models/note-schema/index";

export class NoteController {
  constructor(private service: NoteService) {}

  // private handleError(error: unknown, res: Response) {
  //   if (error instanceof ZodError) {
  //     return res.status(400).json({
  //       message: "Validation error",
  //       errors: error.errors.map((err) => ({
  //         field: err.path.join("."),
  //         message: err.message,
  //       })),
  //     });
  //   }
  //   if (error instanceof Error) {
  //     return res.status(400).json({ error: error.message });
  //   }
  //   return res.status(500).json({ error: "Internal Server Error" });
  // }

  // private parseIds(req: Request) {
  //   const userId = Number(req.params.id);
  //   const noteId = req.params.noteId ? Number(req.params.noteId) : null;

  //   if (isNaN(userId)) throw new Error("Invalid User ID");
  //   if (noteId !== null && isNaN(noteId)) throw new Error("Invalid Note ID");

  //   return { userId, noteId };
  // }

  async create(req: Request, res: Response) {
    try {
      const { userId } = parseIds(req);
      const parseData = noteSchema.safeParse(req.body);

      if (!parseData.success) {
        return res.status(400).json({
          message: "Invalid information",
          erro: parseData.error.errors,
        });
      }

      const { title, description } = parseData.data;

      const newNote = await this.service.createNote(userId, {
        title,
        description,
      });

      res.status(202).json({
        message: "Note created successfully!",
        ...newNote,
      });
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { userId } = parseIds(req);

      const allNote = await this.service.getAllNotes(userId);
      res.status(200).json({ allNote });
    } catch (error) {
      handleError(error, res);
    }
  }

  async getNote(req: Request, res: Response) {
    try {
      const { noteId, userId } = parseIds(req);

      if (!noteId)
        return res.status(404).json({ message: "Note ID is required" });

      const getNote = await this.service.getNote(noteId, userId);

      res.status(200).json({ getNote });
    } catch (error) {
      handleError(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const parseData = noteSchema.safeParse(req.body);

      if (!parseData.success) {
        return res.status(400).json({
          message: "Invalid information",
          erro: parseData.error.errors,
        });
      }
      const { description, title } = parseData.data;
      const { userId, noteId } = parseIds(req);
      if (!noteId) return res.status(404).json({ message: "Note not found" });
      const note = await this.service.updateNote(
        userId,
        noteId,
        description,
        title
      );

      res.status(200).json({ message: "Update note successfully!", ...note });
    } catch (error) {
      handleError(error, res);
    }
  }
}
