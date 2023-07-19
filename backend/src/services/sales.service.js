const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return sales;
};

const getByIdSales = async (id) => {
  const sale = await salesModel.findByIdSales(id);

  if (sale.length === 0) {
    return { message: 'Sale not found' };
  }
  return sale;
};

module.exports = {
  getAllSales,
  getByIdSales,
};