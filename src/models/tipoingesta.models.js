const POOL = require('../db');


const TIPO_INGESTA = (porcion) => {
  this.id = +porcion.id;
  this.nombre = porcion.nombre;
  this.descripcion = porcion.descripcion;
}


TIPO_INGESTA.getAll = async () => await POOL.query("SELECT * FROM tipoingesta;");


module.exports = TIPO_INGESTA;
