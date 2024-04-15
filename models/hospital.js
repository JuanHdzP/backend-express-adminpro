const { Schema, model } = require("mongoose");

// Cambiar nombre de la collection
const nombreColeccion = "hospitales";

const HospitalSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

// Modificacion para retornar el modelo sin "__v"
// *Esto no afecta la db es solo visual*
HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

// Cambiar nombre de la colección utilizando la variable definida anteriormente
module.exports = model("Hospital", HospitalSchema, nombreColeccion);
