import type { Application } from "express";
import noteRoutes from "./note/routes";
import userRoutes from "./user/routes";

const setupRoutes = (app: Application) => {
  userRoutes(app);
  noteRoutes(app);
};

export default setupRoutes;
