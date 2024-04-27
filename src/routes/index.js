const { Router } = require("express");

//Importamos las rutas
const notes = require("./notes.js");

const router = Router();

router.use("/notes", notes);

module.exports = router;
