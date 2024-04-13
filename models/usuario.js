const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Modificacion para retornar el modelo sin "__v, password" y reemplazar _id por uid
// *Esto no afecta la db es solo visual*
UsuarioSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

// Usuario en singular (Mongoose pone el plural tener en cuenta que es en EN Hospital seria Hospitals en vez de Hospitales)
module.exports = model("Usuario", UsuarioSchema);
