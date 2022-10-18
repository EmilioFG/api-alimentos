const ALIMENTO = require('../models/alimento.models');


const getAll = async (req, res) => {
  const alimentos = await ALIMENTO.getAll();
  res.json(alimentos.rows)
};

const getById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) res.status(400).send({ message: "Debe de enviar un Id válido" });

  const alimento = await ALIMENTO.getById(id);
  res.json(alimento.rows[0] || {});
};

const getByName = async (req, res) => {
  const { nombre } = req.query;
  if (!nombre) res.status(400).send({ message: "Debe de enviar un nombre" });

  const alimento = await ALIMENTO.getByName(nombre);
  res.json(alimento.rows);
};


module.exports = {
  getAll,
  getById,
  getByName,
};
