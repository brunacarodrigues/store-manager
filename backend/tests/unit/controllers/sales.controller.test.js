const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { mockAllSales } = require('../mock/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

const ERROR_MSG = 'Internal server error';

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
      message: ERROR_MSG,
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

  it('retorna erro 500 ao criar uma nova venda com falha no serviço', async function () {
    const req = {
      body: [{ productId: 1, quantity: 5 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'createSales').throws(new Error('Test error'));
    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: ERROR_MSG });
  });

  it('retorna o erro 500 ao chamar a função deleteSale com falha no serviço', async function () {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getByIdSales').throws(new Error('Test error'));
    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: ERROR_MSG });
  });

  it('retorna a deleção de uma venda existente com sucesso', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getByIdSales').resolves(mockAllSales[0]);
    sinon.stub(salesService, 'deleteSale');
    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({ message: 'Full deleted sale' });
  });

  it('retorna erro 500 ao tentar deletar uma venda com falha no serviço', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getByIdSales').resolves(mockAllSales[0]);
    sinon.stub(salesService, 'deleteSale').throws(new Error('Test error'));

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: ERROR_MSG });
  });

  it('retorna erro 500 ao tentar atualizar a quantidade de um produto em uma venda com falha no serviço', async function () {
    const req = {
      params: { saleId: 1, productId: 1 },
      body: { quantity: 8 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'updateSale').throws(new Error('Test error'));
    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: ERROR_MSG });
  });
});