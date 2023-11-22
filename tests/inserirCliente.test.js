
// inserirCliente.test.js

// import dos módulo que contém a função a ser testada
const controllerProcedure = require('../controller/controller_procedures');
const clienteDAO = require('../model/DAO/clienteDAO'); 

describe('Testes para POST /v1/saveeats/cliente', () => {
  //limpar os mocks
  beforeEach(() => {
    jest.clearAllMocks();
  });

   // testa o cenário em que a função deve retornar um erro se o e-mail já existe
  it('Deve retornar erro se o e-mail já existe', async () => {

    // configura um "spy" para a função verificarEmailExistenteCliente que simula um e-mail já existente
    jest.spyOn(clienteDAO, 'verificarEmailExistenteCliente').mockReturnValue(true);

     // configura um "spy" para a função inserirCadastroCliente que simula um erro de e-mail já existente

    jest.spyOn(controllerProcedure, 'inserirCadastroCliente').mockReturnValue({ status: 401, message: 'ERROR_EMAIL_ALREADY_EXISTS' });

    // chama a função a ser testada com dados simulando um e-mail existente
    const resultado = await controllerProcedure.inserirCadastroCliente({ /* dados com e-mail existente */ });
    expect(resultado).toEqual({ status: 401, message: 'ERROR_EMAIL_ALREADY_EXISTS' });
  });
});

/////////////////////////////////////////////////////////////////////////
