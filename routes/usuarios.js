// Ruta /api/usuarios

const { Router } = require("express");
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarMongoID } = require("../middlewares/validar-mongo-id");
const { validarAdminRole, validarAdminRole_oMismoUsuario } = require("../middlewares/validar-role");

const router = Router();

// Ruta get
router.get("/", validarJWT, getUsuarios);

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
    validarJWT,
    validarMongoID,
    validarAdminRole_oMismoUsuario,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    // middleware personalizado
    validarCampos,
  ],
  actualizarUsuario
);
// Ruta put
router.delete("/:id", [validarJWT, validarMongoID, validarAdminRole], borrarUsuario);

module.exports = router;
