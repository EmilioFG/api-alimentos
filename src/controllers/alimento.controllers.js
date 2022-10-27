const ALIMENTO = require('../models/alimento.models');

const { handleError } = require('../utils');


const getAll = async (req, res) => {
  try {
    const alimentos = await ALIMENTO.getAll();
    res.json(alimentos.rows);
  } catch (error) {
    handleError(res, error.message);
  }
};

const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) handleError(res, "Debe de enviar un Id válido");

    const alimento = await ALIMENTO.getById(id);
    res.json(alimento.rows[0] || {});
  } catch (error) {
    const { message } = error;
    handleError(res, message);
  }
};

const getByName = async (req, res) => {
  try {
    const { nombre } = req.query;
    if (!nombre) handleError(res, "Debe de enviar un nombre");

    const alimento = await ALIMENTO.getByName(nombre);
    res.json(alimento.rows);
  } catch (error) {
    handleError(res, error.message);
  }
};


module.exports = {
  getAll,
  getById,
  getByName,
};
