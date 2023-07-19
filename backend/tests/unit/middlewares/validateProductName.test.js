const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { validateProductName } = require('../../../src/middlewares/validateProductName');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o Middlewares', function () {
  beforeEach(function () {
    sinon.restore();
  });
  
  it('retorna erro se nome informado não tiver a quantidade de caracteres exigida', async function () {
    const req = {
      body: { name: 'Theo' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    const next = sinon.stub().returns();
    await validateProductName(req, res, next);
  
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('retorna erro se não for passado um nome', async function () {
    const req = {
      body: { name: '' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    const next = sinon.stub().returns();
    await validateProductName(req, res, next);
    
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
});
