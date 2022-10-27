const USUARIO = require('../models/usuario.models');

const { handleError } = require('../utils');


const signIn = async (req, res) => {
  try {

    const formData = req.body;
    const {
      usuario,
      password,
      nombre,
      peso,
      estatura,
      fechanacimiento,
      genero,
    } = formData;

    if (!usuario) handleError(res, "Debe de enviar un usuario");
    if (!password) handleError(res, "Debe de enviar un password");
    if (!nombre) handleError(res, "Debe de enviar un nombre");
    if (!peso) handleError(res, "Debe de enviar un peso");
    if (!estatura) handleError(res, "Debe de enviar una estatura");
    if (!fechanacimiento) handleError(res, "Debe de enviar una fechanacimiento");
    if (!genero) handleError(res, "Debe de enviar un genero");

    const usuarioExiste = await USUARIO.getByUsuario(usuario);
    if (usuarioExiste.rows > 0) handleError(res, "El usuario que intenta registrar ya existe");

    const newUsuario = await USUARIO.signIn(formData);
    res.json(newUsuario.rowCount);
  } catch (error) {
    const message =
      error.message.includes("unique constraint")
        ? "El usuario que intenta registrar ya existe"
        : error.message;

    handleError(res, message);
  }
}


module.exports = {
  signIn,
}