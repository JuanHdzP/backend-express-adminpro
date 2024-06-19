const { response } = require("express");
const Usuario = require("../models/usuario");

const validarAdminRole = async (req, res = response, next) => {
  try {
    const uid = req.uid;

    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "No cuenta con los privilegios para realizar esa accion",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const validarAdminRole_oMismoUsuario = async (req, res = response, next) => {
  try {
    const uid = req.uid;
    const id = req.params.id;

    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    if ((usuarioDB.role == "ADMIN_ROLE") | (uid === id)) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "No cuenta con los privilegios para realizar esa accion",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  validarAdminRole,
  validarAdminRole_oMismoUsuario,
};
