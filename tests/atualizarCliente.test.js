// atualizarCliente.test.js

const controllerProcedure = require('../controller/controller_procedures');
const message = require('../controller/modulo/config'); 

describe('Testes para PUT /v1/saveeats/cliente', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar erro se faltarem campos obrigatórios', async () => {
    // simulando que o cliente esteja deixando dados vazios/campos em brancos
    const resultado = await controllerProcedure.atualizarCadastroCliente({}, 'idCliente');  

    expect(resultado).toEqual(message.ERROR_REQUIRED_FIELDS);
  });
});
