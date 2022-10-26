const INGESTA = require("../models/ingesta.models");
const USUARIO = require("../models/usuario.models");


const save = async (req, res) => {
  const form = req.body;
  const ingesta = await INGESTA.save(form);
  res.json(ingesta.rowCount)
};

const getByUsuario = async (req, res) => {
  const { usuario } = req.query;
  if (!usuario) res.status(400).send({ message: "Debe de enviar un usuario" });

  const responseUsuario = await USUARIO.getByUsuario(usuario);
  if (responseUsuario.length < 0) res.status(400).send({ message: "El usuario no existe" });

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
}

const calculoMetaCalorica = ({ peso, estatura, edad, genero }) => {
  const calculo = ((10 * +peso) + (6.25 * +estatura) - (5 * +edad));
  return (genero === 'H') ? calculo + 5 : calculo - 161;
};


module.exports = {
  save,
  getByUsuario,
};
