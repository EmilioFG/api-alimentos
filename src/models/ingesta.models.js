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

INGESTA.getByUsuario = async (usuario, fecha) => await POOL.query(`
  SELECT i.usuario,
        a.nombre alimento,
        a.descripcion descripcionalimento,
        p.nombre porcion,
        t.nombre tipoingesta,
        SUM(i.cantidad * a.calorias) calorias,
        SUM(i.cantidad * a.carbohidratos) carbohidratos,
        SUM(i.cantidad * a.proteinas) proteinas,
        SUM(i.cantidad * a.grasas) grasas
  FROM ingesta i
      JOIN alimento a on i.alimento = a.id
      JOIN porcion p on i.porcion = p.id
      JOIN tipoingesta t on i.tipoingesta = t.id
  WHERE i.usuario = '${usuario}' AND i.fecha >= '${fecha}' AND i.fecha <= '${fecha}'
  GROUP BY i.usuario, a.nombre, a.descripcion, p.nombre, t.nombre;
`);


module.exports = INGESTA;
