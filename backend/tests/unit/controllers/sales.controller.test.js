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
});