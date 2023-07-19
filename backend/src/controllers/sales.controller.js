const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesService.getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
  
const getByIdSales = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getByIdSales(id);
  
    if (sale.message) {
      return res.status(404).json(sale);
    }
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
  
module.exports = {
  getAllSales,
  getByIdSales,
};