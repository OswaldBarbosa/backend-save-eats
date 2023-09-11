/* ***************************************************************************************************************************************************
 * Objetivo : API para integração entre back e banco de dados (GET,POST,PUT,DELETE)
 * Autor : Caroline Portela
 * Data 30/08/2023
 * Versão : 1.0 
 *************************************************************************************************************************************************** */

//Import das bibliotecas para API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Import do arquivo de configuração das variaveis,constantes e funcoes globais.
var message = require('./controller/modulo/config.js')

//Cria um objeto conforme a classe do express
const app = express();

app.use((request, response, next) => {
    //Define quem poderá acessar a API
    response.header('Access-Control-Allow-Origin', '*');

    //Define quais metodos serão utilizados na API
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

    //Atribui as permissões as cors
    app.use(cors());

    next();
})

//Define que os dados que irão chegar no body da requisição será no padrão JSON
const bodyParserJSON = bodyParser.json();


//Import das controllers
var controllerCliente = require('./controller/controller_cliente.js');
var controllerRestaurante = require('./controller/controller_restautante.js');
var controllerTelefoneDoRestaurante = require('./controller/controller_telefone_restaurante.js')
var controllerCategoriaRestaurante = require('./controller/controller_categoria_restaurante.js')
var controllerDiaSemana = require('./controller/controller_dia_semana.js')
var controllerHorarioFuncionamento = require('./controller/controller_horario_funcionamento.js')
var controllerRestauranteFuncionamentoDiaSemana = require('./controller/controller_restaurante_funcionamento_dia_semana.js')
var controllerEnderecoRestaurante = require('./controller/controller_endereco_restaurante.js')
var controllerEstadoRestaurante = require('./controller/controller_estado_restaurante.js')
var controllerEstadoCliente = require('./controller/controller_estado_cliente')
var controllerCidadeRestaurante = require('./controller/controller_cidade_restaurante.js')
var controllerCidadeCliente = require('./controller/controller_cidade_cliente.js')
var controllerEnderecoCliente = require('./controller/controller_endereco_cliente.js')
var controllerIntermedEnderecoCliente = require('./controller/controller_intermed_endereco_cliente.js')
var controllerFinanceiro = require('./controller/controller_financeiro.js')
var controllerFreteAreaEntrega = require('./controller/controller_frete_area_entrega.js')
var controllerProduto = require('./controller/controller_produto.js')
var controllerStatusProduto = require('./controller/controller_status_produto.js')
var controllerCategoriaProduto = require('./controller/controller_categoria_produto.js')

///////////////////////////////////////// Cliente //////////////////////////////////////////////

/********************************
* Objetivo : API de controle do Cliente
* Data : 31/08/2023
********************************/


//EndPoint: POST - Insere um cliente
app.post('/v1/saveeats/cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerCliente.inserirCliente(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui cliente pelo id
app.delete('/v1/saveeats/cliente/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCliente = request.params.id;

    let resultDadosCliente = await controllerCliente.deletarCliente(idCliente)

    if (resultDadosCliente) {
        response.json(resultDadosCliente);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza cliente pelo id
app.put('/v1/saveeats/cliente/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


    if (String(contentType).toLowerCase() == 'application/json') {

        let idCliente = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosCliente = await controllerCliente.atualizarCliente(dadosBody, idCliente);

        response.status(resultDadosCliente.status)
        response.json(resultDadosCliente)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos clientes
app.get('/v1/saveeats/clientes', cors(), async function (request, response) {

    let dados = await controllerCliente.getClientes();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna o cliente pelo id
app.get('/v1/saveeats/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCliente.getClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});


///////////////////////////////////////// Restaurante //////////////////////////////////////////////


/********************************
* Objetivo : API de controle do Restaurante
* Data : 31/08/2023
********************************/


//EndPoint: POST - Insere um Restaurante
app.post('/v1/saveeats/restaurante', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerRestaurante.inserirRestaurante(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui restaurante pelo id
app.delete('/v1/saveeats/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idRestaurante = request.params.id;

    let resultDadosRestaurante = await controllerRestaurante.deletarRestaurante(idRestaurante)

    if (resultDadosRestaurante) {
        response.json(resultDadosRestaurante);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza restaurante pelo id
app.put('/v1/saveeats/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


    if (String(contentType).toLowerCase() == 'application/json') {

        let idRestaurante = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosRestaurante = await controllerRestaurante.atualizarRestaurante(dadosBody, idRestaurante);

        response.status(resultDadosRestaurante.status)
        response.json(resultDadosRestaurante)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos restaurantes
app.get('/v1/saveeats/restaurantes', cors(), async function (request, response) {

    let dados = await controllerRestaurante.getRestaurantes();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna o restaurante pelo email e senha
app.get('/v1/saveeats/restaurante/email/:email/senha/:senha', cors(), async function (request, response) {
    let email = request.params.email
    let senha = request.params.senha

    let dados = await controllerRestaurante.getRestauranteByEmailSenha(email, senha)

    response.status(dados.status)
    response.json(dados)
})

//EndPoint: GET - Retorna o restaurante pelo id
app.get('/v1/saveeats/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerRestaurante.getRestaurantePorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Telefone Do Restaurante //////////////////////////////////////////////


/********************************
* Objetivo : API de controle do Telefone do Restaurante
* Data : 31/08/2023
********************************/

//EndPoint: POST - Insere um novo telefone de um restaurante
app.post('/v1/saveeats/telefone/restaurante', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTelefoneDoRestaurante.inserirTelefoneDoRestaurante(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui telefone pelo id
app.delete('/v1/saveeats/telefone/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idTelefone = request.params.id;

    let resultDadosTelefoneRestaurante = await controllerTelefoneDoRestaurante.deletarTelefoneDoRestaurante(idTelefone)

    if (resultDadosTelefoneRestaurante) {
        response.json(resultDadosTelefoneRestaurante);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza telefone  pelo id
app.put('/v1/saveeats/telefone/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


    if (String(contentType).toLowerCase() == 'application/json') {

        let idTelefone = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosTelefoneRestaurante = await controllerTelefoneDoRestaurante.atualizarTelefoneDoRestaurante(dadosBody, idTelefone);

        response.status(resultDadosTelefoneRestaurante.status)
        response.json(resultDadosTelefoneRestaurante)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos telefones
app.get('/v1/saveeats/telefones', cors(), async function (request, response) {

    let dados = await controllerTelefoneDoRestaurante.getTelefoneDoRestaurante();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna o telefone pelo id
app.get('/v1/saveeats/telefone/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerTelefoneDoRestaurante.getTelefoneDoRestaurantePorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Categoria Do Restaurante //////////////////////////////////////////////


/********************************
* Objetivo : API de controle das Categorias dos Restaurantes
* Data : 31/08/2023
********************************/

//EndPoint: POST - Insere uma nova CATEGORIA 
app.post('/v1/saveeats/categoria/restaurante', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerCategoriaRestaurante.inserirCategoriaRestaurante(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui uma CATEGORIA pelo id
app.delete('/v1/saveeats/categoria/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCategoria = request.params.id;

    let resultDados = await controllerCategoriaRestaurante.deletarCategoriaRestaurante(idCategoria)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza categoria pelo id
app.put('/v1/saveeats/categoria/restaurante/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


    if (String(contentType).toLowerCase() == 'application/json') {

        let idCategoriaRestaurante = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerCategoriaRestaurante.atualizarCategoriaRestaurante(dadosBody, idCategoriaRestaurante);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todas categorias
app.get('/v1/saveeats/categoria/restaurante', cors(), async function (request, response) {

    let dados = await controllerCategoriaRestaurante.getCategoriaRestaurante();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna a categoria pelo id
app.get('/v1/saveeats/categoria/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCategoriaRestaurante.getCategoriaRestaurantePorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Dia Semana  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle da tabela dia_semana
* Data : 04/09/2023
********************************/

//EndPoint: POST - Insere um novo registro de dia
app.post('/v1/saveeats/dia/semana', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerDiaSemana.inserirDiaSemana(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui um registro de dia pelo id
app.delete('/v1/saveeats/dia/semana/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idDiaSemana = request.params.id;

    let resultDados = await controllerDiaSemana.deletarDiaSemana(idDiaSemana)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza dia da semana pelo id
app.put('/v1/saveeats/dia/semana/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idDiaSemana = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerDiaSemana.atualizarDiaSemana(dadosBody, idDiaSemana);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registros de dias
app.get('/v1/saveeats/dia/semana', cors(), async function (request, response) {

    let dados = await controllerDiaSemana.getDiaSemana();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna dia semana pelo id
app.get('/v1/saveeats/dia/semana/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerDiaSemana.getDiaSemanaPorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Horario Funcionamento  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle do horario de funcionamento
* Data : 04/09/2023
********************************/

//EndPoint: POST - Insere um novo horario de funcionamento
app.post('/v1/saveeats/horario/funcionamento', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerHorarioFuncionamento.inserirHorarioFuncionamento(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui um horario de funcionamento pelo id
app.delete('/v1/saveeats/horario/funcionamento/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idHorarioFuncionamento = request.params.id;

    let resultDados = await controllerHorarioFuncionamento.deletarHorarioFuncionamento(idHorarioFuncionamento)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza horario de funcionamento pelo id
app.put('/v1/saveeats/horario/funcionamento/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idHorarioFuncionamento = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerHorarioFuncionamento.atualizarHorarioFuncionamento(dadosBody, idHorarioFuncionamento);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos horarios de funcionamento
app.get('/v1/saveeats/horario/funcionamento', cors(), async function (request, response) {

    let dados = await controllerHorarioFuncionamento.getHorarioFuncionamento();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna horario funcionamento pelo id
app.get('/v1/saveeats/horario/funcionamento/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerHorarioFuncionamento.getHorarioFuncionamentoPorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Restaurante Funcionamento Dia Semana (Intermediaria)  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle do funcionamento do restaurante
* Data : 04/09/2023
********************************/

//EndPoint: POST - Insere um novo registro de funcionamento do restaurante
app.post('/v1/saveeats/restaurante/funcionamento/dia/semana', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerRestauranteFuncionamentoDiaSemana.inserirRestauranteFuncionamentoDiaSemana(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui registro de funcionamento do restaurante pelo id
app.delete('/v1/saveeats/restaurante/funcionamento/dia/semana/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idRestauranteFuncionamentoDiaSemana = request.params.id;

    let resultDados = await controllerRestauranteFuncionamentoDiaSemana.deletarRestauranteFuncionamentoDiaSemana(idRestauranteFuncionamentoDiaSemana)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza registro de funcionamento do restaurante pelo id
app.put('/v1/saveeats/restaurante/funcionamento/dia/semana/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idRestauranteFuncionamentoDiaSemana = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerRestauranteFuncionamentoDiaSemana.atualizarRestauranteFuncionamentoDiaSemana(dadosBody, idRestauranteFuncionamentoDiaSemana);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registros
app.get('/v1/saveeats/restaurante/funcionamento/dia/semana', cors(), async function (request, response) {

    let dados = await controllerRestauranteFuncionamentoDiaSemana.getRestauranteFuncionamentoDiaSemana();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro pelo id
app.get('/v1/saveeats/restaurante/funcionamento/dia/semana/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerRestauranteFuncionamentoDiaSemana.getRestauranteFuncionamentoDiaSemanaPorID(id)

    response.status(dados.status)
    response.json(dados)
});


///////////////////////////////////////// Endereco Restaurante  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Endereco Restaurante
* Data : 04/09/2023
********************************/

//EndPoint: POST - Insere um novo registro de endereco do restaurante
app.post('/v1/saveeats/endereco/restaurante', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerEnderecoRestaurante.inserirEnderecoRestaurante(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui registro do endereco de um restaurante pelo id
app.delete('/v1/saveeats/endereco/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idEnderecoRestaurante = request.params.id;

    let resultDados = await controllerEnderecoRestaurante.deletarEnderecoRestaurante(idEnderecoRestaurante)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza registro do endereco de um restaurante pelo id
app.put('/v1/saveeats/endereco/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idEnderecoRestaurante = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerEnderecoRestaurante.atualizarEnderecoRestaurante(dadosBody, idEnderecoRestaurante);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registros
app.get('/v1/saveeats/endereco/restaurante', cors(), async function (request, response) {

    let dados = await controllerEnderecoRestaurante.getEnderecoRestaurante();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro pelo id
app.get('/v1/saveeats/endereco/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerEnderecoRestaurante.getEnderecoRestaurantePorID(id)

    response.status(dados.status)
    response.json(dados)
});


/********************************
* Objetivo : API de controle do Estado Restaurante
* Data : 04/09/2023
********************************/

//EndPoint: POST - Insere um novo estado no banco
app.post('/v1/saveeats/estado/restaurante', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerEstadoRestaurante.inserirEstadoRestaurante(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui um estado 
app.delete('/v1/saveeats/estado/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idEstadoRestaurante = request.params.id;

    let resultDados = await controllerEstadoRestaurante.deletarEstadoRestaurante(idEstadoRestaurante)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


//EndPoint: PUT - Atualiza um estado pelo id
app.put('/v1/saveeats/estado/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idEstadoRestaurante = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerEstadoRestaurante.atualizarEstadoRestaurante(dadosBody, idEstadoRestaurante);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registros
app.get('/v1/saveeats/estado/restaurante', cors(), async function (request, response) {

    let dados = await controllerEstadoRestaurante.getEstadoRestaurante();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro pelo id
app.get('/v1/saveeats/estado/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerEstadoRestaurante.getEstadoRestaurantePorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Estado Cliente  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle do Estado Cliente
* Data : 04/09/2023
********************************/

//EndPoint: POST - Insere um novo estado no banco
app.post('/v1/saveeats/estado/cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerEstadoCliente.inserirEstadoCliente(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui um estado 
app.delete('/v1/saveeats/estado/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idEstadoCliente = request.params.id;

    let resultDados = await controllerEstadoCliente.deletarEstadoCliente(idEstadoCliente)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


//EndPoint: PUT - Atualiza um estado pelo id
app.put('/v1/saveeats/estado/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idEstadoCliente = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerEstadoCliente.atualizarEstadoCliente(dadosBody, idEstadoCliente);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registros
app.get('/v1/saveeats/estado/cliente', cors(), async function (request, response) {

    let dados = await controllerEstadoCliente.getEstadoCliente();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro pelo id
app.get('/v1/saveeats/estado/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerEstadoCliente.getEstadoClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});



///////////////////////////////////////// Cidade Restaurante  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Cidade Restaurante
* Data : 05/09/2023
********************************/


//EndPoint: POST - Insere uma nova cidade com id do estado no banco
app.post('/v1/saveeats/cidade/restaurante', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerCidadeRestaurante.inserirCidadeRestaurante(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui uma cidade com id do estado
app.delete('/v1/saveeats/cidade/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCidadeRestaurante = request.params.id;

    let resultDados = await controllerCidadeRestaurante.deletarCidadeRestaurante(idCidadeRestaurante)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//Verificar esse endpoint
//EndPoint: PUT - Atualiza uma cidade pelo id
app.put('/v1/saveeats/cidade/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idCidadeRestaurante = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerCidadeRestaurante.atualizarCidadeRestaurante(dadosBody, idCidadeRestaurante);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todas cidades
app.get('/v1/saveeats/cidade/restaurante', cors(), async function (request, response) {

    let dados = await controllerCidadeRestaurante.getCidadeRestaurante();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna cidade pelo id
app.get('/v1/saveeats/cidade/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCidadeRestaurante.getCidadeRestaurantePorID(id)

    response.status(dados.status)
    response.json(dados)
});


///////////////////////////////////////// Cidade Cliente  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Cidade Cliente
* Data : 06/09/2023
********************************/


//EndPoint: POST - Insere uma nova cidade com id do estado no banco
app.post('/v1/saveeats/cidade/cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerCidadeCliente.inserirCidadeCliente(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui uma cidade com id do estado
app.delete('/v1/saveeats/cidade/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCidadeCliente = request.params.id;

    let resultDados = await controllerCidadeCliente.deletarCidadeCliente(idCidadeCliente)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza uma cidade pelo id
app.put('/v1/saveeats/cidade/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idCidadeCliente = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerCidadeCliente.atualizarCidadeCliente(dadosBody, idCidadeCliente);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todas cidades
app.get('/v1/saveeats/cidade/cliente', cors(), async function (request, response) {

    let dados = await controllerCidadeCliente.getCidadeCliente();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna cidade pelo id
app.get('/v1/saveeats/cidade/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCidadeCliente.getCidadeClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});


///////////////////////////////////////// Endereco Cliente  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Endereco Cliente
* Data : 06/09/2023
********************************/

//EndPoint: POST - Insere um novo registro de endereco do cliente
app.post('/v1/saveeats/endereco/cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerEnderecoCliente.inserirEnderecoCliente(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui registro do endereco de um cliente pelo id
app.delete('/v1/saveeats/endereco/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idEnderecoCliente = request.params.id;

    let resultDados = await controllerEnderecoCliente.deletarEnderecoCliente(idEnderecoCliente)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza registro do endereco de um cliente pelo id
app.put('/v1/saveeats/endereco/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idEnderecoCliente = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerEnderecoCliente.atualizarEnderecoCliente(dadosBody, idEnderecoCliente);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registros
app.get('/v1/saveeats/endereco/cliente', cors(), async function (request, response) {

    let dados = await controllerEnderecoCliente.getEnderecoCliente();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro pelo id
app.get('/v1/saveeats/endereco/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerEnderecoCliente.getEnderecoClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Intermed Endereco Cliente  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle da intermediária entre Endereco Cliente
* Data : 06/09/2023
********************************/

//EndPoint: POST - Insere um novo registro de endereco do cliente
app.post('/v1/saveeats/intermed-endereco-cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerIntermedEnderecoCliente.inserirIntermedEnderecoCliente(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui registro do endereco de um cliente pelo id
app.delete('/v1/saveeats/intermed-endereco-cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idIntermedEnderecoCliente = request.params.id;

    let resultDados = await controllerIntermedEnderecoCliente.deletarIntermedEnderecoCliente(idIntermedEnderecoCliente)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza registro do endereco de um cliente pelo id
app.put('/v1/saveeats/intermed-endereco-cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idIntermedEnderecoCliente = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerIntermedEnderecoCliente.atualizarIntermedEnderecoCliente(dadosBody, idIntermedEnderecoCliente);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registros
app.get('/v1/saveeats/intermed-endereco-cliente', cors(), async function (request, response) {

    let dados = await controllerIntermedEnderecoCliente.getIntermedEnderecoCliente();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro pelo id
app.get('/v1/saveeats/intermed-endereco-cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerIntermedEnderecoCliente.getIntermedEnderecoClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Categoria das Dicas //////////////////////////////////////////////

/********************************
* Objetivo : API de controle das Categorias das Dicas
* Data : 07/09/2023
********************************/

//EndPoint: POST - Insere uma nova CATEGORIA 
app.post('/v1/saveeats/categoria/dicas', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerCategoriaDicas.inserirCategoriaDicas(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui uma CATEGORIA pelo id
app.delete('/v1/saveeats/categoria/dicas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCategoria = request.params.id;

    let resultDados = await controllerCategoriaDicas.deletarCategoriaDicas(idCategoria)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza categoria pelo id
app.put('/v1/saveeats/categoria/dicas/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


    if (String(contentType).toLowerCase() == 'application/json') {

        let idCategoriaDicas = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerCategoriaDicas.atualizarCategoriaDicas(dadosBody, idCategoriaDicas);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todas categorias
app.get('/v1/saveeats/categoria/dicas', cors(), async function (request, response) {

    let dados = await controllerCategoriaDicas.getCategoriaDicas();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna a categoria pelo id
app.get('/v1/saveeats/categoria/dicas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCategoriaDicas.getCategoriaDicasPorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Dicas //////////////////////////////////////////////

/********************************
* Objetivo : API de controle das Dicas
* Data : 07/09/2023
********************************/

//EndPoint: POST - Insere uma nova DICA 
app.post('/v1/saveeats/dicas', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerDicas.inserirDicas(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui uma DICA pelo id
app.delete('/v1/saveeats/dicas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idDicas = request.params.id;

    let resultDados = await controllerDicas.deletarDicas(idDicas)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza DICA pelo id
app.put('/v1/saveeats/dicas/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


    if (String(contentType).toLowerCase() == 'application/json') {

        let idDicas = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerDicas.atualizarDicas(dadosBody, idDicas);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todas DICAS
app.get('/v1/saveeats/dicas', cors(), async function (request, response) {

    let dados = await controllerDicas.getDicas();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna a DICA pelo id
app.get('/v1/saveeats/dicas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerDicas.getDicasPorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Intermed Categoria Dicas  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle da intermediária entre Categoria Dicas
* Data : 07/09/2023
********************************/

//EndPoint: POST - Insere um novo registro de categoria das dicas
app.post('/v1/saveeats/intermed-categoria-dicas', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerIntermedCategoriaDicas.inserirIntermedCategoriaDicas(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui registro da categoria das dicas pelo id
app.delete('/v1/saveeats/intermed-categoria-dicas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idIntermedCategoriaDicas = request.params.id;

    let resultDados = await controllerIntermedCategoriaDicas.deletarIntermedCategoriaDicas(idIntermedCategoriaDicas)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza registro da categoria das dicas pelo id
app.put('/v1/saveeats/intermed-categoria-dicas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idIntermedCategoriaDicas = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerIntermedCategoriaDicas.atualizarIntermedCategoriaDicas(dadosBody, idIntermedCategoriaDicas);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registros
app.get('/v1/saveeats/intermed-categoria-dicas', cors(), async function (request, response) {

    let dados = await controllerIntermedCategoriaDicas.getIntermedCategoriaDicas();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro pelo id
app.get('/v1/saveeats/intermed-categoria-dicas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerIntermedCategoriaDicas.getIntermedCategoriaDicasID(id)

    response.status(dados.status)
    response.json(dados)
});


///////////////////////////////////////// Cidade Cliente  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Cidade Cliente
* Data : 06/09/2023
********************************/


//EndPoint: POST - Insere uma nova cidade com id do estado no banco
app.post('/v1/saveeats/cidade/cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerCidadeCliente.inserirCidadeCliente(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui uma cidade com id do estado
app.delete('/v1/saveeats/cidade/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCidadeCliente = request.params.id;

    let resultDados = await controllerCidadeCliente.deletarCidadeCliente(idCidadeCliente)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: PUT - Atualiza uma cidade pelo id
app.put('/v1/saveeats/cidade/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idCidadeCliente = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerCidadeCliente.atualizarCidadeCliente(dadosBody, idCidadeCliente);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todas cidades
app.get('/v1/saveeats/cidade/cliente', cors(), async function (request, response) {

    let dados = await controllerCidadeCliente.getCidadeCliente();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna cidade pelo id
app.get('/v1/saveeats/cidade/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCidadeCliente.getCidadeClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});


///////////////////////////////////////// Financeiro  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle do Financeiro
* Data : 06/09/2023
********************************/


//EndPoint: POST - Insere uma novo registro na tabela financeiro
app.post('/v1/saveeats/financeiro', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerFinanceiro.inserirFinanceiro(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: DELETE - Exclui um registro da tabela financeiro pelo id
app.delete('/v1/saveeats/financeiro/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idFinanceiro = request.params.id;

    let resultDados = await controllerFinanceiro.deletarFinanceiro(idFinanceiro)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


//EndPoint: GET - Retorna todos registro da tabela financeiro
app.get('/v1/saveeats/financeiro', cors(), async function (request, response) {

    let dados = await controllerFinanceiro.getFinanceiro();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna financeiro pelo id
app.get('/v1/saveeats/financeiro/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerFinanceiro.getFinanceiroPorID(id)

    response.status(dados.status)
    response.json(dados)
});


//EndPoint: PUT - Atualiza dados do financeiro pelo id
app.put('/v1/saveeats/financeiro/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idFinanceiro = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerFinanceiro.atualizarFinanceiro(dadosBody, idFinanceiro);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


///////////////////////////////////////// Frete Area Entrega  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle da tabela frete_area_entrega
* Data : 06/09/2023
********************************/

//EndPoint: POST - Insere uma novo registro na tabela frete_area_entrega
app.post('/v1/saveeats/frete/area/entrega', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerFreteAreaEntrega.inserirFreteAreaEntrega(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: PUT - Atualiza registro da tabela frete_area_entrega por id
app.put('/v1/saveeats/frete/area/entrega/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idFreteAreaEntrega = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerFreteAreaEntrega.atualizarFreteAreaEntrega(dadosBody, idFreteAreaEntrega);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: GET - Retorna todos registro da tabela frete_area_entrega
app.get('/v1/saveeats/frete/area/entrega', cors(), async function (request, response) {

    let dados = await controllerFreteAreaEntrega.getFreteAreaEntrega();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro da tabela pelo id
app.get('/v1/saveeats/frete/area/entrega/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerFreteAreaEntrega.getFreteAreaEntregaPorID(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: DELETE - Exclui um registro da tabela frete_area_entrega
app.delete('/v1/saveeats/frete/area/entrega/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idFreteAreaEntrega = request.params.id;

    let resultDados = await controllerFreteAreaEntrega.deletarFreteAreaEntrega(idFreteAreaEntrega)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

///////////////////////////////////////// Produto  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle do Produto
* Data : 06/09/2023
********************************/

//EndPoint: GET - Retorna todos registro da tabela produto
app.get('/v1/saveeats/produto', cors(), async function (request, response) {

    let dadosProduto = await controllerProduto.getAllProdutos()

    response.status(dadosProduto.status)
    response.json(dadosProduto)

})

//EndPoint: GET - Retorna um registro da tabela produto pelo id
app.get('/v1/saveeats/produto/id/:id', cors(), async function (request, response) {

    let idProduto = request.params.id

    let dadosProduto = await controllerProduto.getProdutosById(idProduto)

    response.status(dadosProduto.status)
    response.json(dadosProduto)

})

//EndPoint: POST - Insere uma novo registro na tabela produto
app.post('/v1/saveeats/produto', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resulDados = await controllerProduto.inserirProduto(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//EndPoint: PUT - Atualiza registro da tabela produto pelo id
app.put('/v1/saveeats/produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idProduto = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerProduto.atualizarProduto(dadosBody, idProduto);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

})

//EndPoint: DELETE - Deleta um registro da tabela produto pelo id
app.delete('/v1/saveeats/produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idProduto = request.params.id;

    let resultDados = await controllerProduto.deletarProduto(idProduto)

    response.status(resultDados.status)
    response.json(resultDados)

})

///////////////////////////////////////// Status Produto  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle do Status do Produto
* Data : 06/09/2023
********************************/

//EndPoint: GET - Retorna todos registro da tabela status produto
app.get('/v1/saveeats/status/produto', cors(), async function (request, response) {

    let dadosStatusProduto = await controllerStatusProduto.getAllStatusProduto()

    response.status(dadosStatusProduto.status)
    response.json(dadosStatusProduto)

})

//EndPoint: GET - Retorna um registro da tabela status produto pelo id
app.get('/v1/saveeats/status/produto/id/:id', cors(), async function (request, response) {

    let idStatusProduto = request.params.id

    let dadosStatusProduto = await controllerStatusProduto.getStatusProdutoById(idStatusProduto)

    response.status(dadosStatusProduto.status)
    response.json(dadosStatusProduto)

})

//EndPoint: POST - Insere uma novo registro na tabela status produto
app.post('/v1/saveeats/status/produto', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resulDados = await controllerStatusProduto.inserirStatusProduto(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//EndPoint: PUT - Atualiza registro da tabela status produto pelo id
app.put('/v1/saveeats/status/produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idStatusProduto = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerStatusProduto.atualizarStatusProduto(dadosBody, idStatusProduto)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

})

//EndPoint: DELETE - Deleta um registro da tabela staus produto pelo id
app.delete('/v1/saveeats/status/produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idStatusProduto = request.params.id;

    let resultDados = await controllerStatusProduto.deletarStatusProduto(idStatusProduto)

    response.status(resultDados.status)
    response.json(resultDados)

})

///////////////////////////////////////// Categoria Produto  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle da Categoria do Produto
* Data : 06/09/2023
********************************/

//EndPoint: GET - Retorna todos registro da tabela categoria produto
app.get('/v1/saveeats/categoria/produto', cors(), async function (request, response) {

    let dadosCategoriaProduto = await controllerCategoriaProduto.getAllCategoriaProduto()

    response.status(dadosCategoriaProduto.status)
    response.json(dadosCategoriaProduto)

})

//EndPoint: GET - Retorna um registro da tabela categoria produto pelo id
app.get('/v1/saveeats/categoria/produto/id/:id', cors(), async function (request, response) {

    let idCategoriaProduto = request.params.id

    let dadosCategoriaProduto = await controllerCategoriaProduto.getCategoriaProdutoById(idCategoriaProduto)

    response.status(dadosCategoriaProduto.status)
    response.json(dadosCategoriaProduto)

})

//EndPoint: POST - Insere uma novo registro na tabela categoria produto
app.post('/v1/saveeats/categoria/produto', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resulDados = await controllerCategoriaProduto.inserirCategoriaProduto(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//EndPoint: PUT - Atualiza registro da tabela categoria produto pelo id
app.put('/v1/saveeats/categoria/produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idCategoriaProduto = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerCategoriaProduto.atualizarCategoriaProduto(dadosBody, idCategoriaProduto)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

})

//EndPoint: DELETE - Deleta um registro da tabela categoria produto pelo id
app.delete('/v1/saveeats/categoria/produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCategoriaProduto = request.params.id;

    let resultDados = await controllerCategoriaProduto.deletarCategoriaProduto(idCategoriaProduto)

    response.status(resultDados.status)
    response.json(resultDados)

})

app.listen(8080, function () {
    console.log('Servidor aguardando requisição na porta 8080')
})