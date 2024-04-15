const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");

const getTodo = async (req, resp = response) => {
  const busqueda = req.params.busqueda;

  // Creacion de expresion regular al parametro busqueda para hacerlo insensible y sea mas flexible
  const regex = new RegExp(busqueda, "i");

  //   const usuarios = await Usuario.find({ nombre: regex });
  //   const medicos = await Medico.find({ nombre: regex });
  //   const hospitales = await Hospital.find({ nombre: regex });

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  resp.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getPorColeccion = async (req, resp = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;

  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuarios",
        "nombre img"
      );
      break;
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");

      break;

    default:
      return resp.status(400).json({
        ok: false,
        msg: "Coleccion de busqueda no encontrada",
      });
  }
  resp.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getPorColeccion,
};
