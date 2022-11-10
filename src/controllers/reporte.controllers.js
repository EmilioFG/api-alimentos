const REPORTE = require('../models/reporte.models');
const USUARIO = require("../models/usuario.models");

const { handleError, formatearFecha } = require('../utils');


const getAll = async (req, res) => {
  try {
    const { token } = req;
    if (!token) handleError(res, "Debe de enviar un usuario");

    const responseUsuario = await USUARIO.getByToken(token);
    if (responseUsuario.rows.length <= 0) return handleError(res, "El usuario no existe");

    const infoUsuario = responseUsuario.rows[0];
    const response = await REPORTE.getNutrientes(infoUsuario.usuario);

    let reporte = {
      labels: [],
      calorias: [],
      carbohidratos: [],
      proteinas: [],
      grasas: [],
    };
    for (let data of response.rows) {
      const { fecha, calorias, carbohidratos, proteinas, grasas } = data;
      reporte.labels.push(formatearFecha(fecha));
      reporte.calorias.push(calorias);
      reporte.carbohidratos.push(carbohidratos);
      reporte.proteinas.push(proteinas);
      reporte.grasas.push(grasas);
    }


    res.json(reporte);
  } catch (error) {
    handleError(res, error.message);
  }
}


module.exports = {
  getAll,
}
