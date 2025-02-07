import type { Request, Response } from "express";
import { ZodError } from "zod";
import type { UserService } from "../services";
import {
  loginSchema,
  userSchema,
} from "./../../../../../packages/auth-schema/index";

export class UserController {
  constructor(private service: UserService) {}

  async create(req: Request, res: Response) {
    try {
      const parseData = userSchema.safeParse(req.body);

      if (!parseData.success) {
        return res.status(400).json({
          message: "Invalid data",
          errors: parseData.error.errors,
        });
      }

      const { name, email, password } = parseData.data;

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

  async login(req: Request, res: Response) {
    try {
      const parseData = loginSchema.safeParse(req.body);

      if (!parseData.success) {
        return res.status(400).json({
          message: "Invalid data",
          errors: parseData.error.errors,
        });
      }

      const { email, password } = parseData.data;

      const { token, user } = await this.service.loginUser({ email, password });

      res.status(202).json({ message: "Login successfully", token, user });
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
}
