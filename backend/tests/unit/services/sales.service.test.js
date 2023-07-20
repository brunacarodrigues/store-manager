const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');
const { mockAllSales, mockByIdSales } = require('../mock/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o Sales Service', function () {      
  beforeEach(function () {
    sinon.restore();
  });
  
  it('retorna todas as vendas do banco de dados', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(mockAllSales);
    const response = await salesService.getAllSales();

    expect(response).to.be.an('array');
    expect(response).to.have.lengthOf(3);
    expect(response).to.be.deep.equal(mockAllSales);
  });
  
  it('retorna um produto pelo ID', async function () {
    sinon.stub(salesModel, 'findByIdSales').resolves(mockByIdSales);
    const response = await salesService.getByIdSales(1);

    expect(response).to.be.an('object');
    expect(response).to.deep.equal(mockByIdSales);
  });

  it('retorna "Sale not found" se o ID da venda não for informado ou encontrado', async function () {
    sinon.stub(salesModel, 'findByIdSales').resolves([]);
    const response = await salesService.getByIdSales(9);

    expect(response).to.be.deep.equal({ message: 'Sale not found' });
  });
  it('retorna se a venda for deletada', async function () {
    const idSaleDeleted = 69;
    const deleteSaleStub = sinon.stub(salesModel, 'deleteSale');
    await salesService.deleteSale(idSaleDeleted);

    expect(deleteSaleStub).to.have.been.calledWith(idSaleDeleted);
  });
});