import dotenv from "dotenv";
import express from "express";
import setupRoutes from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT;
setupRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
