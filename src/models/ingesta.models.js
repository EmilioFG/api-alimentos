const POOL = require('../db');


const INGESTA = (ingesta) => {
  this.cantidad = ingesta.cantidad;
  this.fecha = ingesta.fecha;
  this.usuario = ingesta.usuario;
  this.alimento = ingesta.alimento;
  this.porcion = ingesta.porcion;
  this.tipoIngesta = ingesta.tipoIngesta;
}


INGESTA.save = async ({
  cantidad,
  usuario,
  alimento,
  porcion,
  tipoIngesta,
}) => await POOL.query(`
  INSERT INTO ingesta (CANTIDAD, FECHA, USUARIO, ALIMENTO, PORCION, TIPOINGESTA)
  VALUES (${cantidad}, (SELECT CURRENT_TIMESTAMP), '${usuario}', ${alimento}, ${porcion}, ${tipoIngesta});
`);


module.exports = INGESTA;
