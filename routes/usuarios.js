// Ruta /api/usuarios

const { Router } = require("express");
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Ruta get
router.get("/", getUsuarios);

// Ruta post
router.post(
  "/",
  // Middlewares express-validator
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    // middleware personalizado
    validarCampos,
  ],
  crearUsuario
);

// Ruta put
router.put(
  "/:id",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").isEmail(),
  ],
  actualizarUsuario
);

module.exports = router;
