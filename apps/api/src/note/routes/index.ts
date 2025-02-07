import type { Application } from "express";
import { NoteController } from "../controllers";
import { NoteService } from "../services";

const service = new NoteService();
const controller = new NoteController(service);

const noteRoutes = (app: Application) => {
  app.post("/user/:id/new-note", (req, res) => {
    controller.create(req, res);
  });

  app.get("/user/:id/notes", (req, res) => {
    controller.getAll(req, res);
  });

  app.get("/user/:id/notes/:noteId", (req, res) => {
    controller.getNote(req, res);
  });
};

export default noteRoutes;
