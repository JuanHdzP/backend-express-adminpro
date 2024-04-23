const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    // Si no existe el usuario se debe crear
    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email: email,
        password: "####",
        img: picture,
        google: true,
      });
    } else {
      //existe el usuario
      usuario = usuarioDB;
      usuario.google = true;
    }

    // Guardar en DB

    await usuario.save();

    // Generar JWT con funcion helpers/jwt/generarJWT()
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token no es correcto",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  // Generar JWT con funcion helpers/jwt/generarJWT()
  const token = await generarJWT(uid);

  const usuarioDB = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario: usuarioDB,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
