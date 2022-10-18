const PORCION = require("../models/porcion.models");


const getAll = async (req, res) => {
  const porciones = await PORCION.getAll();
  res.json(porciones.rows)
};


module.exports = {
  getAll,
};
