import NoteModel from "../models/Note.js";

// 69e723bac51838f95e427e91

export const getAllNote = async (req, res) => {
  const note = await NoteModel.find({}).sort({ updatedAt: -1 });

  res.json({ message: "Get All Note successfully", data: note });
};

export const getNoteDetail = async (req, res) => {
  const { id } = req.params;

  const note = await NoteModel.findById(id).exec();

  res.json({ message: "Get All Note successfully", data: note });
};

export const createNote = async (req, res) => {
  const newNote = new NoteModel(req.body);

  await newNote.save();
  res.json({ message: "Create Note successfully", data: newNote });
};

export const updateNote = async (req, res) => {
  const { id } = req.params;

  const editNote = await NoteModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ message: "Updated Note successfully", data: editNote });
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  const deleteNote = await NoteModel.findByIdAndDelete(id);

  res.json({ message: "Deleted Note successfully", data: deleteNote });
};
