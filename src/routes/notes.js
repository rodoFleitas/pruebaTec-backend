const server = require("express").Router();

server.get("/", async (req, res) => {
  try {
    let notes = [
      {
        id: 1,
        title: "Nota uno",
        note: "Esta es una nota de prueba.",
      },
    ];

    res.status(200).json({ notes });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error al obtener las notas" });
  }
});

module.exports = server;
