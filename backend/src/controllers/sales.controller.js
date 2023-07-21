const { salesService } = require('../services');

const ERROR_MSG = 'Internal server error';

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesService.getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
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
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const createSales = async (req, res) => {
  try {
    const newSale = req.body;
    const sale = await salesService.createSales(newSale);
    return res.status(201).json(sale);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getByIdSales(id);
    if (!sale.message) {
      await salesService.deleteSale(id);
      return res.status(204).json({ message: 'Full deleted sale' });
    }
    return res.status(404).json({ message: 'Sale not found' });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const updateSale = async (req, res) => {
  try {
    const { saleId, productId } = req.params;
    const { quantity } = req.body;
    const [updatedSale] = await salesService.updateSale(saleId, productId, quantity);
    return res.status(200).json(updatedSale);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

module.exports = {
  getAllSales,
  getByIdSales,
  createSales,
  deleteSale,
  updateSale,
};
