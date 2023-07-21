const camelize = require('camelize');
const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(`
      SELECT 
        sales.id saleId, prod.product_id productId, prod.quantity quantity, sales.date date 
      FROM 
        sales sales 
      JOIN 
        sales_products prod 
      ON 
        sales.id = prod.sale_id 
      ORDER BY 
        sales.id, productId;
    `);
  return camelize(sales);
};
  
const findByIdSales = async (id) => {
  const [sale] = await connection.execute(`
      SELECT 
        sales.date date, prod.product_id productId, prod.quantity quantity
      FROM 
        sales sales
      JOIN 
        sales_products prod ON sales.id = prod.sale_id
      WHERE 
        sales.id = ?
      ORDER BY 
        sales.id, productId
    `, [id]);
  return camelize(sale);
};

const createSales = async (newIdSale, productId, quantity) => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
  `, [newIdSale, productId, quantity]);
  return insertId;
};

const createSaleId = async () => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO sales (date) VALUES (NOW());
  `);
  return insertId;
};

const deleteSale = async (id) => {
  const [deletedSale] = await connection.execute(`
  DELETE FROM sales WHERE id = ?;
  `, [id]);
  return deletedSale;
};

const updateSale = async (saleId, productId, quantity) => {
  await connection.execute(`
  UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;
  `, [quantity, saleId, productId]);
  const [updatedSale] = await connection.execute(`
  SELECT DISTINCT(s.date), sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity 
  FROM sales AS s INNER JOIN sales_products AS sp
  WHERE sale_id = ? AND product_id = ?;
  `, [saleId, productId]);
  return updatedSale;
};

module.exports = {
  findAllSales,
  findByIdSales,
  createSales,
  createSaleId,
  deleteSale,
  updateSale,
};