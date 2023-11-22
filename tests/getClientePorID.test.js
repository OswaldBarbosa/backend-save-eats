
// getClientePorID.test.js

// import dos módulo que contém a função a ser testada
const controllerCliente = require('../controller/controller_cliente');
const clienteDAO = require('../model/DAO/clienteDAO');
const message = require('../controller/modulo/config'); 

describe('Testes para GET /v1/saveeats/cliente/id/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar sucesso ao buscar um cliente existente', async () => {
    // configura  o mock da função selectClienteByID para simular um cliente existente
    jest.spyOn(clienteDAO, 'selectClienteByID').mockReturnValue([{ id: 2, nome: 'Caroline Portela' }]);

    const resultado = await controllerCliente.getClientePorID(1);

    expect(resultado.status).toEqual(message.SUCESS_REQUEST.status);
    expect(resultado.message).toEqual(message.SUCESS_REQUEST.message);
    expect(resultado.cliente).toEqual([{ id: 2, nome: 'Caroline Portela' }]);
  });

  it('Deve retornar erro não encontrado ao buscar um cliente inexistente', async () => {
    // configurar o mock da função selectClienteByID para simular um cliente inexistente
    jest.spyOn(clienteDAO, 'selectClienteByID').mockReturnValue(false);

    const resultado = await controllerCliente.getClientePorID(200);

    expect(resultado).toEqual(message.ERROR_NOT_FOUND);
  });

  it('Deve retornar erro de ID inválido', async () => {
    const resultado = await controllerCliente.getClientePorID('invalido');

    expect(resultado).toEqual(message.ERROR_INVALID_ID);
  });
});
