import cors from "cors";
import "dotenv/config";
import express from "express";
import { env } from "../../../packages/env-config";
import setupRoutes from "./routes";

const app = express();
const port = env.port;

app.use(express.json());
app.use(cors());

setupRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
