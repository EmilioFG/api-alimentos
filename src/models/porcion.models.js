const POOL = require('../db');


const PORCION = (porcion) => {
  this.id = +porcion.id;
  this.nombre = porcion.nombre;
  this.descripcion = porcion.descripcion;
}


PORCION.getAll = async () => await POOL.query("SELECT * FROM porcion;");


module.exports = PORCION;
