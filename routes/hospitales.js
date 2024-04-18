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
const { validarMongoID } = require("../middlewares/validar-mongo-id");

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
router.put(
  "/:id",
  [
    validarJWT,
    validarMongoID,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  actualizarHospital
);
// Ruta put
router.delete("/:id", [validarJWT, validarMongoID], borrarHospital);

module.exports = router;
