const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();

// Crear el servidor Express
const app = express();

// Configurar cors
app.use(cors());

// Base de datos
dbConnection();

// console.log(process.env);

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto " + process.env.port);
});

// Rutas
app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hola" });
});
