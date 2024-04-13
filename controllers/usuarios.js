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

const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese id",
      });
    }

    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe ususario con ese email",
        });
      }
    }

    campos.email = email;

    // Quito los campos que no deseo actualizar del usuario (Optimizado)
    // delete campos.password;
    // delete campos.google;

    // Actualizar y devolver data del nuevo
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
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
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
};
