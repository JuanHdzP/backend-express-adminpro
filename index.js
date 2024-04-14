const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();

// Crear el servidor Express
const app = express();

// Configurar cors
app.use(cors());

// Lectura y parseo del Body
app.use(express.json());

// Base de datos
dbConnection();

// console.log(process.env);

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto " + process.env.port);
});

// Rutas

// Antes
// app.get("/api/usuarios", (req, res) => {
//   res.json({ ok: true, usuarios: [{id: 123, nombre: "Juan"}] });
// });

// Despues
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));
