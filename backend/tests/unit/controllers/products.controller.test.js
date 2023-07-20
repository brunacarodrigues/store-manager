const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { mockAllProducts, mockByIdProducts } = require('../mock/products.mock');
const { productsModel } = require('../../../src/models');

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

  it('retorna o erro 500 ao chamar a função getAllProducts', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const errorMessage = 'Something went wrong';
    sinon.stub(productsService, 'getAllProducts').throws(new Error(errorMessage));

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({
      message: 'Internal server error',
    });
  });

  it('retorna um erro ao tentar inserir um produto sem "name"', async function () {
    const req = {
      body: { name: '' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsService, 'createProductByName').resolves(null);
    await productsController.createProductByName(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(null);
  });

  it('retorna o produto ao chamar a função getByIdProducts', async function () {
    const req = { params: { id: 2 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsService, 'getByIdProducts').resolves(mockByIdProducts);
    await productsController.getByIdProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockByIdProducts);
  });

  it('atualiza e retorna o produto ao chamar a função updateProduct', async function () {
    const req = { params: { id: 1 }, body: { name: 'Updated Product' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const productBD = { id: 1, name: 'Old Product' };
    const updatedProduct = { id: 1, name: 'Updated Product' };
    sinon.stub(productsModel, 'findByIdProducts').resolves(productBD);
    sinon.stub(productsService, 'updateProduct').resolves(updatedProduct);
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });

  it('deleta um produto e retorna o status 204 ao chamar a função deleteProduct', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const productBD = { id: 1, name: 'Product to delete' };
    sinon.stub(productsModel, 'findByIdProducts').resolves(productBD);
    sinon.stub(productsService, 'deleteProduct').resolves();
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });
  
  it('retorna o erro 404 ao tentar deletar um produto que não existe', async function () {
    const req = { params: { id: 100 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsModel, 'findByIdProducts').resolves(null);
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});