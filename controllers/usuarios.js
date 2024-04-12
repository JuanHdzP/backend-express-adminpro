const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const getUsuarios = async (req, res = response) => {
  // En el metodo find se aplica un filtro de lo que queremos mandar en el json
  const usuarios = await Usuario.find({}, "nombre email role google");
  res.json({ ok: true, usuarios: usuarios });
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExistente = await Usuario.findOne({ email: email });

    if (emailExistente) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }
    const usuario = new Usuario(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    res.json({ ok: true, usuario: usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, hablar con el administrador",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
};
