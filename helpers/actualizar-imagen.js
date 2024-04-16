const fs = require("fs");

const Usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");

//  reemplazar imagen

const reemplazarImg = (path) => {
  //   fs libreria filesystem
  if (fs.existsSync(path)) {
    // Borrar imagen anterior
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo;
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("Id no corresponde a un medico");
        return false;
      }
      pathViejo = `./uploads/medicos/${medico.img}`;
      reemplazarImg(pathViejo);

      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("Id no corresponde a un hospital");
        return false;
      }
      pathViejo = `./uploads/hospitales/${hospital.img}`;
      reemplazarImg(pathViejo);

      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("Id no corresponde a un usuario");
        return false;
      }
      pathViejo = `./uploads/usuarios/${usuario.img}`;
      reemplazarImg(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;

    default:
      break;
  }
};

module.exports = {
  actualizarImagen,
};
