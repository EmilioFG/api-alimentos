const PORCION = require("../models/porcion.models");

const { handleError } = require('../utils');


const getAll = async (req, res) => {
  try {
    const porciones = await PORCION.getAll();
    res.json(porciones.rows)
  } catch (error) {
    handleError(res, error.message);
  }
};


module.exports = {
  getAll,
};
