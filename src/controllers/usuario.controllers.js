const USUARIO = require('../models/usuario.models');

const { handleError, bcryptPassword, generateToken } = require('../utils');


const signIn = async (req, res) => {
  try {
    const {
      usuario,
      password,
      nombre,
      peso,
      estatura,
      fechanacimiento,
      genero,
    } = req.body;

    if (!usuario) handleError(res, "Debe de enviar un usuario");
    if (!password) handleError(res, "Debe de enviar un password");
    if (!nombre) handleError(res, "Debe de enviar un nombre");
    if (!peso) handleError(res, "Debe de enviar un peso");
    if (!estatura) handleError(res, "Debe de enviar una estatura");
    if (!fechanacimiento) handleError(res, "Debe de enviar una fechanacimiento");
    if (!genero) handleError(res, "Debe de enviar un genero");

    const usuarioExiste = await USUARIO.getByUsuario(usuario);
    if (usuarioExiste.rows > 0) handleError(res, "El usuario que intenta registrar ya existe");

    const hashedPassword = await bcryptPassword(password);
    const newUsuario = await USUARIO.signIn({
      usuario,
      nombre,
      peso,
      estatura,
      fechanacimiento,
      genero,
      password: hashedPassword,
    });

    res.json(newUsuario.rowCount);
  } catch (error) {
    const message =
      error.message.includes("unique constraint")
        ? "El usuario que intenta registrar ya existe"
        : error.message;

    handleError(res, message);
  }
}

const logIn = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario) handleError(res, "Debe de enviar un usuario");
    if (!password) handleError(res, "Debe de enviar un password");

    const usuarioExiste = await USUARIO.getByUsuario(usuario);
    if (usuarioExiste.rows <= 0) handleError(res, "El usuario no existe");

    const hashedPassword = usuarioExiste.rows[0].password;
    const token = generateToken(password, hashedPassword);

    await USUARIO.updateToken(token, usuario);
    req.usuario = usuario;
    res.json({ token });
  } catch (error) {
    handleError(res, error.message);
  }
}


module.exports = {
  signIn,
  logIn,
}
