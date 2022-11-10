const POOL = require('../db');


const REPORTE = () => {};


REPORTE.getNutrientes = async (usuario) => await POOL.query(`
  SELECT A.fecha, SUM(A.calorias) calorias, SUM(A.carbohidratos) carbohidratos, SUM(A.proteinas) proteinas, SUM(A.grasas) grasas
  FROM (
    SELECT i.fecha,
          (SUM(i.cantidad * a.calorias))    calorias,
          SUM(i.cantidad * a.carbohidratos) carbohidratos,
          SUM(i.cantidad * a.proteinas)     proteinas,
          SUM(i.cantidad * a.grasas)        grasas
    FROM ingesta i
          JOIN alimento a on i.alimento = a.id
    WHERE i.usuario = '${usuario}'
    GROUP BY i.usuario, a.nombre, a.descripcion, i.fecha
    ORDER BY i.fecha
  ) AS A
  GROUP BY A.fecha;
`);


module.exports = REPORTE;
