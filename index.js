import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express from "express";
import notesRouter from "./routes/notes.js";
import authRouter from "./routes/auth.js";
import { cronJob } from "./utils/index.js";

cronJob();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/notes", notesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
