const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { countries } = require("./countries");
const { activity } = require("./activity");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countries);
router.use("/activities", activity);

router.use("/", (req, res) => {
  res.send("Home Page");
});

module.exports = router;
