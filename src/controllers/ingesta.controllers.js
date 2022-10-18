const INGESTA = require("../models/ingesta.models");


const save = async (req, res) => {
  const form = req.body;
  console.log('FORM', form)
  const ingesta = await INGESTA.save(form);
  res.json(ingesta.rowCount)
};


module.exports = {
  save,
};
