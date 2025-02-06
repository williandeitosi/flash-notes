import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import z from "zod";

const envSchema = z.object({
  port: z.string().default(process.env.PORT || "3000"),
  database_url: z.string().default(process.env.DATABASE_URL || ""),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("Current env:", process.env); // Debug
  console.error("Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
