// Ruta /api/todo/:busqueda
// Ruta /api/todo/:tabla/:busqueda

const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-jwt");
const { getTodo, getPorColeccion } = require("../controllers/busquedas");

const router = Router();

// Ruta get
router.get("/:busqueda", validarJWT, getTodo);
router.get("/coleccion/:tabla/:busqueda", validarJWT, getPorColeccion);

module.exports = router;
