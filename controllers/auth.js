const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificar Email
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no valido",
      });
    }

    // Verificar password
    const validarPass = bcrypt.compareSync(password, usuarioDB.password);

    if (!validarPass) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no valida",
      });
    }

    // Generar JWT con funcion helpers/jwt/generarJWT()
    const token = await generarJWT(usuarioDB.id);

    return res.json({
      ok: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, hablar con el administrador",
    });
  }
};

module.exports = {
  login,
};
