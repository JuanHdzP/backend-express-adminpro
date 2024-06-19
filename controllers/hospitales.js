const { response } = require("express");
const Hospital = require("../models/hospital");
const usuario = require("../models/usuario");
const hospital = require("../models/hospital");

const getHospitales = async (req, resp = response) => {
  const hospitales = await Hospital.find().populate(
    "usuario",
    "nombre email img"
  );
  resp.json({
    ok: true,
    hospitales: hospitales,
  });
};

const crearHospital = async (req, resp = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });
  try {
    const hospitalDB = await hospital.save();
    resp.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  const idHospital = req.params.id;
  const uid = req.uid;

  try {
    const hospitalDB = await Hospital.findById(idHospital);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado por id",
      });
    }

    // hospitalDB.nombre = req.body.nombre

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findOneAndUpdate(
      idHospital,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarHospital = async (req, res = response) => {
  const idHospital = req.params.id;
  try {
    const hospitalDB = await Hospital.findById(idHospital);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado por id",
      });
    }

    await Hospital.findByIdAndDelete(idHospital);

    res.json({
      ok: true,
      msg: "Hospital eliminado",
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
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
