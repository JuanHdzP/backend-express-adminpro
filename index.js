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

// Directorio publico
app.use(express.static("public"));

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
app.use("/api/login", require("./routes/auth"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/upload", require("./routes/uploads"));
