const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { findAllSales, findByIdSales, deleteSale } = require('../../../src/models/sales.model');
const { mockAllSales, mockByIdSales } = require('../mock/sales.mock');

chai.use(sinonChai);

describe('Testando o Sales Model', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([mockAllSales]);
    const response = await findAllSales();

    expect(response).to.deep.equal(mockAllSales);
  });

  it('Retorna uma venda pelo ID informado', async function () {
    sinon.stub(connection, 'execute').resolves([mockByIdSales]);
    const response = await findByIdSales(1);

    expect(response).to.be.deep.equal({
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: '2023-07-19T14:27:20.000Z',
    });
  });

  it('retorna "Sale not found" se o ID da venda não for informado ou encontrado', async function () {
    sinon.stub(connection, 'execute').resolves([undefined]);
    const response = await findByIdSales(6);
    
    expect(response).to.deep.equal(undefined);
  });
  it('retorna se a venda for deletada do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([1]);

    const result = await deleteSale(1);

    expect(connection.execute).to.have.been.calledWith(
      sinon.match('DELETE FROM sales WHERE id = ?'),
      sinon.match(1),
    );
    expect(result).to.equal(1);
  });
});