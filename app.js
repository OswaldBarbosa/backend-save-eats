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

//EndPoint: Retorna o cliente pelo id
app.get('/v1/saveeats/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCliente.getClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});


///////////////////////////////////////// Restaurante //////////////////////////////////////////////


/********************************
* Objetivo : API de controle do Cliente
* Data : 31/08/2023
********************************/


