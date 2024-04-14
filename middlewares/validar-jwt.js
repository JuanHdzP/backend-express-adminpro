const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // Leer token desde headers
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    // Verificar token y extraer id del payload
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    // Asignar nuevo campo a la request
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token incorrecto",
    });
  }
};

module.exports = {
  validarJWT,
};
