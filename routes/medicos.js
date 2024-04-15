// Ruta /api/medicos

const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Ruta get
router.get("/", getMedicos);

// Ruta post
router.post(
  "/",
  // Middlewares express-validator
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "El hospital id debe de ser valido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

// Ruta put
router.put("/:id", [], actualizarMedico);
// Ruta put
router.delete("/:id", borrarMedico);

module.exports = router;
