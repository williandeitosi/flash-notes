import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters long")
    .max(50, "Name must be less than 50 characters long"),

  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),

  password: z.string().min(4, "Password must be at least 8 characters long"),
});

export type UserType = z.infer<typeof userSchema>;
