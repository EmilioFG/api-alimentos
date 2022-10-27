const TIPO_INGESTA = require("../models/tipoingesta.models");

const { handleError } = require('../utils');


const getAll = async (req, res) => {
  try {
    const tiposIngesta = await TIPO_INGESTA.getAll();
    res.json(tiposIngesta.rows)
  } catch (error) {
    handleError(res, error.message);
  }
};


module.exports = {
  getAll,
};
