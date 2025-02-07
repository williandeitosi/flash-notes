import type { Application } from "express";
import { UserController } from "../controllers";
import { UserService } from "../services";

const service = new UserService();
const controller = new UserController(service);

const userRoutes = (app: Application) => {
  app.post("/register", (req, res) => {
    controller.create(req, res);
  });
  app.post("/login", (req, res) => {
    controller.login(req, res);
  });
};

export default userRoutes;
