const server = require("express").Router();
const authenticateToken = require("../auth/authenticateToken.js");
const Note = require("../models/Note");

const Notes = require("../models/Note");

server.get("/", authenticateToken, async (req, res) => {
  try {
    let notes = await Notes.find({ creator: req.user._id });

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener las notas" });
  }
});

server.post("/", authenticateToken, async (req, res) => {
  try {
    let { note } = req.body;

    const newNote = new Note({ creator: req.user._id, note: note });
    await newNote.save();

    res.status(200).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al cargar la nota" });
  }
});

server.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    let { note } = req.body;

    await Note.findByIdAndUpdate(id, { note });
    let aux = await Note.findById(id);

    res.status(200).json(aux);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al editar la nota" });
  }
});

server.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await Note.findOneAndDelete(id);

    res.status(200).json({ message: "Nota eliminada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al editar la nota" });
  }
});

module.exports = server;
