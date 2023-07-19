const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { mockAllProducts } = require('../mock/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o Products Controller', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('retorna todos os produtos ao chamar a função getAllProducts', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsService, 'getAllProducts').resolves(mockAllProducts);
    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllProducts);
  });
});