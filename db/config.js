const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false, // Quitar mensajes en consola de Deprecation Warnings al usar findOneAndUpdate
    });
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar db");
  }
};

module.exports = {
  dbConnection,
};
