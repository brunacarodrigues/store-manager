const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { findAllProducts, findByIdProducts } = require('../../../src/models/products.model');
const { mockAllProducts, mockByIdProducts } = require('../mock/products.mock');

describe('Testando o Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });
    
  it('retorna todos os produtos do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([mockAllProducts]);
    const response = await findAllProducts();

    expect(response).to.be.an('array');
    expect(response).to.have.lengthOf(3);
    expect(response).to.deep.equal(mockAllProducts);
  });

  it('retorna um produto pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([[mockByIdProducts]]);
    const response = await findByIdProducts(2);

    expect(response).to.be.an('object');
    expect(response).to.deep.equal({ id: 2, name: 'Traje de encolhimento' });
  });
  it('retorna "Product not found" se o ID do produto não for informado ou encontrado', async function () {
    sinon.stub(connection, 'execute').resolves([[undefined]]);
    const response = await findByIdProducts(6);
    
    expect(response).to.be.equal(undefined);
  });
});