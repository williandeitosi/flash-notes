import type { Application } from "express";
import { UserController } from "../controllers";
import { UserService } from "../services";

const service = new UserService();
const controller = new UserController(service);

const userRoutes = (app: Application) => {
  app.get("/register", (req, res) => {
    controller.create(req, res);
  });
};

export default userRoutes;
