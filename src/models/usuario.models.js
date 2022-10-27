const POOL = require('../db');


const USUARIO = (usuario) => {
  this.usuario = usuario.usuario;
  this.password = usuario.password;
  this.nombre = usuario.nombre;
  this.peso = usuario.peso;
  this.estatura = usuario.estatura;
  this.fechanacimiento = usuario.fechanacimiento;
  this.genero = usuario.genero;
};

USUARIO.signIn = async ({
  usuario,
  password,
  nombre,
  peso,
  estatura,
  fechanacimiento,
  genero,
}) => await POOL.query(`
  INSERT INTO usuario (USUARIO, PASSWORD, NOMBRE, PESO, ESTATURA, FECHANACIMIENTO, GENERO)
  VALUES ('${usuario}', '${password}', '${nombre}', ${peso}, ${estatura}, '${fechanacimiento}', '${genero}');
`);


USUARIO.getByUsuario = async (usuario) => await POOL.query(`
  SELECT U.*, EXTRACT(YEAR FROM AGE((SELECT CURRENT_TIMESTAMP), fechanacimiento)) edad
  FROM usuario U WHERE U.usuario = $1;`, [usuario]
);


module.exports = USUARIO;
