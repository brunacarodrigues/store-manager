const camelize = require('camelize');
const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(`
      SELECT 
        sales.id saleId, prod.product_id productId, prod.quantity quantity, sales.date date 
      FROM 
        StoreManager.sales sales 
      JOIN 
        StoreManager.sales_products prod 
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
        StoreManager.sales sales
      JOIN 
        StoreManager.sales_products prod ON sales.id = prod.sale_id
      WHERE 
        sales.id = ?
      ORDER BY 
        sales.id, productId
    `, [id]);
  return camelize(sale);
};

module.exports = {
  findAllSales,
  findByIdSales,
};