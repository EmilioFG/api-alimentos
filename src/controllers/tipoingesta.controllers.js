const TIPO_INGESTA = require("../models/tipoingesta.models");


const getAll = async (req, res) => {
  const tiposIngesta = await TIPO_INGESTA.getAll();
  res.json(tiposIngesta.rows)
};


module.exports = {
  getAll,
};
