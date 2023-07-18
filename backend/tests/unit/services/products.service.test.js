const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { mockAllProducts, mockByIdProducts } = require('../mock/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o Products Service', function () {      
  beforeEach(function () {
    sinon.restore();
  });
  
  it('retorna todos os produtos do banco de dados', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(mockAllProducts);
    const response = await productsService.getAllProducts();

    expect(response).to.be.an('array');
    expect(response).to.have.lengthOf(3);
    expect(response).to.be.deep.equal(mockAllProducts);
  });
  
  it('retorna um produto pelo ID', async function () {
    sinon.stub(productsModel, 'findByIdProducts').resolves(mockByIdProducts);
    const response = await productsService.getByIdProducts(2);

    expect(response).to.be.an('object');
    expect(response).to.deep.equal({ id: 2, name: 'Traje de encolhimento' });
  });
});