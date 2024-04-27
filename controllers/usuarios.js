const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;
  // En el metodo find se aplica un filtro de la data que deseamos del usuario

  // const usuarios = await Usuario.find({}, "nombre email role google")
  //   .skip(desde) // skip nos ayuda a definir el punto inicial de la paginacion
  //   .limit(5); // limit nos ayuda a establecer cuantos registros queremos para la paginacion

  // const total = await Usuario.count();

  // Optimisacion para generar anteriores promesas de forma simultanea y obtener los resultados por medio de desestructuracion
  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email role img google")
      .skip(desde) // skip nos ayuda a definir el punto inicial de la paginacion
      .limit(5), // limit nos ayuda a establecer cuantos registros queremos para la paginacion

    Usuario.countDocuments(),
  ]);
  res.json({ ok: true, usuarios: usuarios, total: total });
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

    // Generar JWT con funcion helpers/jwt/generarJWT()
    const token = await generarJWT(usuario.id);

    res.json({ ok: true, usuario: usuario, token: token });
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
          msg: "Ya existe usuario con ese email",
        });
      }
    }

    if (!usuarioDB.google) {
      campos.email = email;
    } else if (usuarioDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Usuarios de Google no pueden cambiar su correo",
      });
    }

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

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese id",
      });
    }

    await Usuario.findByIdAndDelete(uid);
    return res.json({
      ok: true,
      msg: "Usuario eliminado",
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
  borrarUsuario,
};
