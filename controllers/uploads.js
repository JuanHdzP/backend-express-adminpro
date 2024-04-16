const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const subirArchivo = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "La coleccion es incorrecta (tipo)",
    });
  }
  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ ok: false, msg: "No hay ningun archivo" });
  }

  // Procesar archivo
  const file = req.files.imagen;

  const nombreArchivoCortado = file.name.split("."); // Imagen.13.05.jpg
  const extensionArchivo =
    nombreArchivoCortado[nombreArchivoCortado.length - 1]; // jpeg, jpg, png ...

  // Validar extension
  const extensionesValidas = ["jpg", "jpeg", "png", "gif"];

  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "El archivo no tiene un formato valido (jpg, jpeg, png, gif)",
    });
  }

  //   Generar nombre de imagen
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar archivo imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  //   Mover el archivo (imagen)
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: "Archivo subido",
      nombreArchivo,
    });
  });
};

const getImagen = async (req, res = response) => {
  const tipo = req.params.tipo;
  const imagen = req.params.img;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

  // Regresar imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/image-not-found.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  subirArchivo,
  getImagen,
};
