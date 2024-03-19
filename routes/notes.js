import express from "express";
import { createNote, getNoteById, getNotes } from "../controllers/notes.js";
import verifyToken from "../middleware/verifyToken.js";

const notesRouter = express.Router();

notesRouter.get("/getAllNotes", verifyToken, async (req, res) => {
  const result = await getNotes(req.userID);

  res.send({
    data: result,
  });
});

notesRouter.get("/getNoteById", verifyToken, async (req, res) => {
  const result = await getNoteById(req.params.id);
  res.send({
    data: result,
  });
});

notesRouter.post("/createNote", verifyToken, async (req, res) => {
  const result = await createNote(req.userID, req.body.title, req.body.content);

  if (result) {
    res.status(201).send({
      message: "Created Succesfully",
    });
  }

  res.status(500).send({
    message: "Error occurred while creating the note"
  })
});

export default notesRouter;