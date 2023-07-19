const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/products.model');
const { validateSales } = require('../../../src/middlewares/validateSale');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o Middleware Validate Sales', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('se a venda informada é válida', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsModel, 'findAllProducts').resolves([
      { id: 1 },
      { id: 2 },
    ]);

    const next = sinon.stub().returns();
    await validateSales(req, res, next);

    expect(next).to.have.been.calledWith();
  });
});