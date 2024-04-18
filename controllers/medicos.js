const { response } = require("express");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre img");
  res.json({
    ok: true,
    medicos: medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body });
  try {
    hospitalValido = await Hospital.findById(req.body.hospital);
    if (!hospitalValido) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital inexistente en DB",
      });
    } else {
      const medicoDB = await medico.save();
      res.json({
        ok: true,
        medico: medicoDB,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarMedico = async (req, res = response) => {
  const idMedico = req.params.id;
  const uid = req.uid;

  try {
    const medicoDB = await Medico.findById(idMedico);
    if (!medicoDB) {
      return res.json({
        ok: false,
        msg: "Medico no encontrado por id",
      });
    }

    const cambiosMedico = {
      usuario: uid,
      ...req.body,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      idMedico,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarMedico = async (req, res = response) => {
  const idMedico = req.params.id;
  try {
    const medicolDB = await Medico.findById(idMedico);
    if (!medicolDB) {
      return res.status(404).json({
        ok: false,
        msg: "Medico no encontrado por id",
      });
    }

    await Medico.findOneAndDelete(idMedico);

    res.json({
      ok: true,
      msg: "Medico eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
