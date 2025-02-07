import type { Request, Response } from "express";
import { ZodError } from "zod";
import type { UserService } from "../services";
import { userSchema } from "./../../../../../packages/auth-schema/index";

export class UserController {
  constructor(private service: UserService) {}

  async create(req: Request, res: Response) {
    try {
      const parsedata = userSchema.safeParse(req.body);

      if (!parsedata.success) {
        return res.status(400).json({
          message: "Invalid data",
          errors: parsedata.error.errors,
        });
      }

      const { name, email, password } = parsedata.data;

      const newUser = await this.service.createUser({ email, password, name });

      res
        .status(202)
        .json({ message: "User created successfully!", user: newUser });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
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

  async login(req: Request, res: Response) {}
}
