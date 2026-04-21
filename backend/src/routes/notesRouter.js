import express from "express";
import {
  createNote,
  deleteNote,
  getAllNote,
  getNoteDetail,
  updateNote,
} from "../controller/notesController.js";
import handleAsync from "../utilities/catchAsync.js";

const router = express.Router();

router
  .route("/")
  .get(handleAsync(getAllNote, "getAllNote"))
  .post(handleAsync(createNote, "createNote"));

router
  .route("/:id")
  .get(handleAsync(getNoteDetail, "getNoteDetail"))
  .put(handleAsync(updateNote, "updateNote"))
  .delete(handleAsync(deleteNote, "deleteNote"));

export default router;
