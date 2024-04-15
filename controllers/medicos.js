const { response } = require("express");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");

const getMedicos = async (req, resp = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre img");
  resp.json({
    ok: true,
    medicos: medicos,
  });
};

const crearMedico = async (req, resp = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body });
  try {
    hospitalValido = await Hospital.findById(req.body.hospital);
    if (!hospitalValido) {
      return resp.status(404).json({
        ok: false,
        msg: "Hospital inexistente en DB",
      });
    } else {
      const medicoDB = await medico.save();
      resp.json({
        ok: true,
        medico: medicoDB,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarMedico = (req, resp = response) => {
  resp.json({
    ok: true,
    msg: "actMedico",
  });
};

const borrarMedico = (req, resp = response) => {
  resp.json({
    ok: true,
    msg: "borrarMedico",
  });
};
module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
