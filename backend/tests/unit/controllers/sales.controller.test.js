const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { mockAllSales } = require('../mock/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o Sales Controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('retorna todas as vendas', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesService, 'getAllSales').resolves(mockAllSales);
    await salesController.getAllSales(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllSales);
  });

  it('retorna a venda pelo ID informado', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesService, 'getByIdSales').resolves(mockAllSales[0]);

    await salesController.getByIdSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllSales[0]);
  });

  it('retorna erro quando a venda estiver incorreta', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const errMsg = 'Please, try again. Something went wrong';
    sinon.stub(salesService, 'getAllSales').throws(new Error(errMsg));

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({
      message: 'Internal server error',
    });
  });

  it('retorna "null" quando a venda não for encontrada', async function () {
    const req = {
      params: { id: 89 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon
      .stub(salesService, 'getByIdSales')
      .resolves({ message: 'Sale not found' });

    await salesController.getByIdSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});