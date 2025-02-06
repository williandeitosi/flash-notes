import type { Request, Response } from "express";
import type { UserService } from "../services";

export class UserController {
  constructor(private service: UserService) {}

  create(req: Request, res: Response) {
    const msg = this.service.createUser();
    res.status(200).json({ message: msg });
  }
}
