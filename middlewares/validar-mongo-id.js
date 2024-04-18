const mongoose = require("mongoose");
const { response } = require("express");

function validarMongoID(req, res = response, next) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      ok: false,
      msg: "El ID proporcionado no es válido",
    });
  }
  next();
}

module.exports = {
  validarMongoID,
};
