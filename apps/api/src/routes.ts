import type { Application } from "express";
import userRoutes from "./user/routes";

const setupRoutes = (app: Application) => {
  userRoutes(app);
};

export default setupRoutes;
