const POOL = require('../db');


const ALIMENTO = (alimento) => {
  this.id = +alimento.id;
  this.nombre = alimento.nombre;
  this.descripcion = alimento.descripcion;
  this.calorias = +alimento.calorias;
  this.carbohidratos = +alimento.carbohidratos;
  this.proteinas = +alimento.proteinas;
  this.grasas = alimento.grasas;
};


ALIMENTO.getAll = async () => await POOL.query("SELECT * FROM alimento;");

ALIMENTO.getByName = async (nombre) => await POOL.query(`SELECT * FROM alimento WHERE nombre ILIKE '%${nombre}%';`);

ALIMENTO.getById = async (id) => await POOL.query("SELECT * FROM alimento WHERE id = $1;", [id]);


module.exports = ALIMENTO;
