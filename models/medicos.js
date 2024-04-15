const { Schema, model } = require("mongoose");
const MedicoSchema = Schema({
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
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

// Modificacion para retornar el modelo sin "__v"
// *Esto no afecta la db es solo visual*
MedicoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

// Usuario en singular (Mongoose pone el plural tener en cuenta que es en EN Hospital seria Hospitals en vez de Hospitales)
module.exports = model("Medico", MedicoSchema);
