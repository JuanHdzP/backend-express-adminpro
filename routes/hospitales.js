// Ruta /api/hospitales

const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales");

const router = Router();

// Ruta get
router.get("/", getHospitales);

// Ruta post
router.post(
  "/",
  // Middlewares express-validator
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

// Ruta put
router.put("/:id", [], actualizarHospital);
// Ruta put
router.delete("/:id", borrarHospital);

module.exports = router;
