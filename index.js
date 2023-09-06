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
var controllerCategoriaRestaurante = require ('./controller/controller_categoria_restaurante.js')
var controllerDiaSemana = require ('./controller/controller_dia_semana.js')
var controllerHorarioFuncionamento = require ('./controller/controller_horario_funcionamento.js')
var controllerRestauranteFuncionamentoDiaSemana = require ('./controller/controller_restaurante_funcionamento_dia_semana.js')
var controllerEnderecoRestaurante = require ('./controller/controller_endereco_restaurante.js')
var controllerEstadoRestaurante = require ('./controller/controller_estado_restaurante.js')
var controllerEstadoCliente = require('./controller/controller_estado_cliente')
var controllerCidadeRestaurante = require ('./controller/controller_cidade_restaurante.js')

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
// app.get('/v1/saveeats/:email/:senha', cors(), async function(request, response) {
//     let email = request.params.email
//     let senha = request.params.senha

//     let Dados = await controllerRestaurante.getRestauranteByEmailSenha(email, senha)

//     //response.status(Dados.status)
//     response.json(Dados)
// })

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

    let dados = await controllerEstadoCliente.getEstadoRestaurante();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna registro pelo id
app.get('/v1/saveeats/estado/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerEstadoCliente.getEstadoRestaurantePorID(id)

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


app.listen(8080, function () {
    console.log('Servidor aguardando requisição na porta 8080')
})