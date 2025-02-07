import type { Request, Response } from "express";
import { ZodError } from "zod";
import type { NoteService } from "../services";
import { noteSchema } from "./../../../../../packages/models/note-schema/index";

export class NoteController {
  constructor(private service: NoteService) {}

  async create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = Number(id);
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
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "validation error",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const allNote = await this.service.getAllNotes(userId);
      res.status(200).json({ allNote });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "validation error",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getNote(req: Request, res: Response) {
    try {
      const { id, noteId } = req.params;

      const userId = Number(id);
      if (!userId) {
        return res.status(404).json({ message: "User not found" });
      }

      const note_id = Number(noteId);
      if (!note_id) {
        return res.status(404).json({ message: "Note not found" });
      }

      const getNote = await this.service.getNote(note_id, userId);

      res.status(200).json({ getNote });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "validation error",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
