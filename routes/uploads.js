// Ruta /api/upload/

const { Router } = require("express");
const fileUpload = require("express-fileupload");

const { validarJWT } = require("../middlewares/validar-jwt");
const { subirArchivo, getImagen } = require("../controllers/uploads");

const router = Router();

// Uso del middleware de express-fileupload para carga de archivos
router.use(fileUpload());

// Ruta put
router.put("/:tipo/:id", validarJWT, subirArchivo);

// Ruta get
router.get("/:tipo/:img", validarJWT, getImagen);

module.exports = router;
