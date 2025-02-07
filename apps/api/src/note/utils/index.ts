import { Request, Response } from "express";
import { ZodError } from "zod";

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
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
};

export const parseIds = (req: Request) => {
  const userId = Number(req.params.id);
  const noteId = req.params.noteId ? Number(req.params.noteId) : null;

  if (isNaN(userId)) throw new Error("Invalid User ID");
  if (noteId !== null && isNaN(noteId)) throw new Error("Invalid Note ID");

  return { userId, noteId };
};
