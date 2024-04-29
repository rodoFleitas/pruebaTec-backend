const { Router } = require("express");

//Importamos las rutas
const notesRoutes = require("./notes.js");
const userRoutes = require("./user.js");


const router = Router();

router.use("/notes", notesRoutes);
router.use("/auth", userRoutes);


module.exports = router;
