const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  // Creamos una promesa para poder trabajar con el JWT desde donde lo querramos generar
  return new Promise((res, rej) => {
    const payload = {
      uid: uid,
    };
    jwt.sign(
      // Se puede poner cualquier informacion necesaria en el payload, menos informacion sensible
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("No se puedo generar el JWT");
        } else {
          res(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
