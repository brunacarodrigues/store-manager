const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { findAllProducts, findByIdProducts, createProductByName, updateProducts, deleteProduct } = require('../../../src/models/products.model');
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
  it('retorna um novo produto ao utilizar a função createProductByName', async function () {
    const newProduct = 'Novo Produto';
    const insertId = 7;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    const response = await createProductByName(newProduct);
  
    expect(response).to.be.an('object');
    expect(response).to.deep.equal({ id: insertId, name: newProduct });
  });
  
  it('retorna um erro ao criar um produto que apresente divergência com o banco de dados', async function () {
    const newProduct = 'Produto com Erro';
    const error = new Error('Erro ao inserir produto');
    sinon.stub(connection, 'execute').rejects(error);
  
    try {
      await createProductByName(newProduct);
      throw new Error('Expected an error to be thrown.');
    } catch (err) {
      expect(err).to.equal(error);
    }
  });
  it('retorna uma atualização de um produto', async function () {
    const updProductId = 1;
    const nameNewProduct = 'Produto Atualizado';
    sinon.stub(connection, 'execute').resolves();
    const response = await updateProducts(updProductId, nameNewProduct);
  
    expect(response).to.be.an('object');
    expect(response).to.deep.equal({ id: updProductId, name: nameNewProduct });
  });
  
  it('retorna um erro ao atualizar um produto com erro no banco de dados', async function () {
    const updProductId = 1;
    const nameNewProduct = 'Produto Atualizado';
    const error = new Error('Erro ao atualizar produto');
    sinon.stub(connection, 'execute').rejects(error);
  
    try {
      await updateProducts(updProductId, nameNewProduct);
      throw new Error('Expected an error to be thrown.');
    } catch (err) {
      expect(err).to.equal(error);
    }
  });

  it('retorna a deleção de um produto corretamente', async function () {
    const producDeletedId = 1;
    sinon.stub(connection, 'execute').resolves();
    const response = await deleteProduct(producDeletedId);
  
    expect(response).to.be.equal(true);
  });
  
  it('retorna um erro ao deletar um produto com erro no banco de dados', async function () {
    const producDeletedId = 1;
    const error = new Error('Erro ao deletar produto');
    sinon.stub(connection, 'execute').rejects(error);
  
    try {
      await deleteProduct(producDeletedId);
      throw new Error('Expected an error to be thrown.');
    } catch (err) {
      expect(err).to.equal(error);
    }
  });
});