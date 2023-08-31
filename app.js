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
var controllerCliente = require ('./controller/controller_cliente.js');
var controllerRestaurante = require ('./controller/controller_restautante.js');
var controllerTelefoneDoRestaurante = require ('./controller/controller_telefone_restaurante.js')
var conntrollerCategoriaRestaurante = require ('./controller/controller_categoria_restaurante.js')

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
app.delete('/v1/saveeats/restaurante/:id', cors(), bodyParserJSON, async function (request, response) {

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
app.put('/v1/saveeats/restaurante/:id', cors(), bodyParserJSON, async function (request, response) {
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
app.delete('/v1/saveeats/telefone/restaurante/:id', cors(), bodyParserJSON, async function (request, response) {

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
app.put('/v1/saveeats/telefone/restaurante/:id', cors(), bodyParserJSON, async function (request, response) {
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

        let resulDados = await conntrollerCategoriaRestaurante.inserirCategoriaRestaurante(dadosBody)

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

    let resultDados = await conntrollerCategoriaRestaurante.deletarCategoriaRestaurante(idCategoria)

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
        let resultDados = await conntrollerCategoriaRestaurante.atualizarCategoriaRestaurante(dadosBody, idCategoriaRestaurante);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todas categorias
app.get('/v1/saveeats/categoria/restaurante', cors(), async function (request, response) {

    let dados = await conntrollerCategoriaRestaurante.getCategoriaRestaurante();

    response.status(dados.status)
    response.json(dados)

});