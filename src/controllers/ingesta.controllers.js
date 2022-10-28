const INGESTA = require("../models/ingesta.models");
const USUARIO = require("../models/usuario.models");

const { handleError } = require('../utils');


const save = async (req, res) => {
  try {

    const formData = req.body;
    const {
      cantidad,
      usuario,
      alimento,
      porcion,
      tipoIngesta,
    } = formData;

    if (!cantidad) handleError(res, "Debe de enviar una cantidad");
    if (!usuario) handleError(res, "Debe de enviar un usuario");
    if (!alimento) handleError(res, "Debe de enviar un alimento");
    if (!porcion) handleError(res, "Debe de enviar una porcion");
    if (!tipoIngesta) handleError(res, "Debe de enviar un tipoIngesta");

    const ingesta = await INGESTA.save(formData);
    res.json(ingesta.rowCount)

  } catch (error) {
    handleError(res, error.message);
  }
};

const getByUsuario = async (req, res) => {
  try {

    const { usuario } = req.query;
    if (!usuario) handleError(res, "Debe de enviar un usuario");

    const responseUsuario = await USUARIO.getByUsuario(usuario);
    if (responseUsuario.length < 0) handleError(res, "El usuario no existe");

    const infoUsuario = responseUsuario.rows[0];
    const ingestas = await INGESTA.getByUsuario(usuario);
    const metaCalorica = calculoMetaCalorica(infoUsuario);

    let caloriasConsumidas = 0;

    const data = {};
    for (let ingesta of ingestas.rows) {
      const {
        tipoingesta,
        calorias,
        alimento,
        descripcionalimento,
        porcion
      } = ingesta;

      if (!data[tipoingesta]) {
        data[tipoingesta] = {
          calorias,
          alimentos: [],
          tipoIngesta: tipoingesta,
          porcentajeCalorias: (calorias / metaCalorica).toFixed(2),
        };
      }

      data[tipoingesta]['alimentos'].push({
        alimento,
        descripcionalimento,
        porcion,
        calorias,
      });

      caloriasConsumidas += +calorias;
    }

    const porcentajeCaloriasConsumidas = ((caloriasConsumidas / metaCalorica).toFixed(2)) * 100;
    const caloriasRestantes = (metaCalorica - caloriasConsumidas)
    const response = {
      ingesta: [],
      informacionCalorica: {
        metaCalorica,
        caloriasRestantes,
        caloriasConsumidas,
        porcentajeCaloriasConsumidas,
      },
    };

    response.ingesta = Object.keys(data).map((key) => data[key]);
    res.json(response);

  } catch (error) {
    handleError(res, error.message);
  }


}

const calculoMetaCalorica = ({ peso, estatura, edad, genero }) => {
  const calculo = ((10 * +peso) + (6.25 * +estatura) - (5 * +edad));
  return (genero === 'H') ? calculo + 5 : calculo - 161;
};


module.exports = {
  save,
  getByUsuario,
};
