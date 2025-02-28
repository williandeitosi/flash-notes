import { z } from "zod";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(1, "Description is required"),
});
export default noteSchema;

export type NoteType = z.infer<typeof noteSchema>;
