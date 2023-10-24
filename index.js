/* ***************************************************************************************************************************************************
 * Objetivo : API para integração entre back e banco de dados (GET,POST,PUT,DELETE,ETC.)
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
var controllerCidadeCliente = require ('./controller/controller_cidade_cliente.js')
var controllerEnderecoCliente = require ('./controller/controller_endereco_cliente.js')
var controllerIntermedEnderecoCliente = require ('./controller/controller_intermed_endereco_cliente.js')
var controllerCategoriaDicas = require ('./controller/controller_categoria_dicas.js')
var controllerDicas = require ('./controller/controller_dicas.js')
var controllerIntermedCategoriaDicas = require ('./controller/controller_intermde_categoria_dicas.js')
var controllerFinanceiro = require ('./controller/controller_financeiro.js')
var controllerFreteAreaEntrega = require ('./controller/controller_frete_area_entrega.js')
var controllerRestauranteFreteAreaEntrega = require ('./controller/controller_restaurante_frete_area_entrega.js')
var controllerFavoritos = require ('./controller/controller_favoritos.js')
var controllerFormaPagamento = require ('./controller/controller_forma_de_pagamento.js')
var controllerRestauranteFormaPagamento = require ('./controller/controller_restaurante_forma_pagamento.js')
var controllerStatusPedido = require ('./controller/controller_status_pedido.js')
var controllerPedido = require ('./controller/controller_pedido.js')
var controllerRecomendacao = require ('./controller/controller_recomendacao.js')
var controllerAvaliacao = require ('./controller/controller_avaliacao.js')
var controllerAvaliacaoRecomendacao = require ('./controller/controller_avaliacao_recomendacao.js')
var controllerRestaurantePedidoCliente = require ('./controller/controller_restaurante_pedido_cliente.js')
var controllerPedidoProduto = require ('./controller/controller_pedido_produto.js')
var controllerProduto = require ('./controller/controller_produto.js')
var controllerStatusProduto = require ('./controller/controller_status_produto.js')
var controllerCategoriaProduto = require ('./controller/controller_categoria_produto.js')
var controllerCategoriaReceitas = require ('./controller/controller_categoria_receitas.js')
var controllerTempoPreparo = require ('./controller/controller_tempo_preparo.js')
var controllerNivelDificuldade = require ('./controller/controller_nivel_dificuldade.js')
var controllerProcedure = require ('./controller/controller_procedures.js')
var controllerViews = require ('./controller/controller_views.js')
var controllerIngrediente = require ('./controller/controller_ingrediente.js')
var controllerReceitasIngredientes = require ('./controller/controller_receitas_ingredientes.js')
var controllerReceitas = require ('./controller/controller_receitas.js')
var controllerIntermedCategoriaReceitas = require ('./controller/controller_intermed_categoria_receitas.js')



///////////////////////////////////////// JWT VERIFICAÇÃO //////////////////////////////////////////////

 //Receber o token encaminhando nas requisicoes e solicitar validacao
 const verifyJWT = async function (request,response,next) {
    
    //import da biblioteca para validacao do token
    const jwt = require ('./middleware/middlewareJWT.js')

    //recebe o token encaminhando no header da requisicao
    let token = request.headers['x-access-token'];

    //Valida a autencidade do Token
    const autenticidadeToken = await jwt.validadeJWT(token);

    //Verifica se a requisicao podera continuar ou sera encerrada
    if(autenticidadeToken)
        next();
    else 
        return response.status(message.ERROR_INVALID_TOKEN.status).end();
        
};


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
app.get('/v1/saveeats/clientes', cors(),  async function (request, response) {

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

//EndPoint: GET - Retorna o cliente existente no banco pelo email e senha
app.get('/v1/saveeats/cliente/email/:email/senha/:senha',cors(),async function(request, response) {
     let email = request.params.email
    let senha = request.params.senha

    let dados = await controllerCliente.getClienteByEmailSenha(email, senha)

    response.status(dados.status)
    response.json(dados)
});



//EndPoint: GET - Retorna o cliente existente no banco pelo email 
app.get('/v1/saveeats/cliente/email/:email',cors(),async function(request, response) {

    let email = request.params.email

    let dados = await controllerCliente.getClienteByEmail(email)

   response.status(dados.status)
   response.json(dados)
});

//EndPoint: POST - Passar dados do login no body e retorna os dados se existir o usuario no banco
app.post('/v1/saveeats/cliente/login/autenticar', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let body = request.body

        let resulDados = await controllerCliente.autenticarLoginClienteEmailSenha(body.email,body.senha)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: POST -Cadastro do cliente com a procedure
app.post('/v1/saveeats/cadastro/cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerProcedure.inserirCadastroCliente(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna endereco de um cliente pelo id cliente
app.get('/v1/saveeats/endereco/cliente/idcliente/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCliente.getEnderecoClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});

///////////////////////////////////////// Restaurante //////////////////////////////////////////////


/********************************
* Objetivo : API de controle do Restaurante
* Data : 31/08/2023
********************************/

//EndPoint: POST - Insere um Restaurante (PROCEDURE)
app.post('/v1/saveeats/restaurante/procedore',cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerProcedure.inserirCadastroProcedure(dadosBody)

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

//EndPoint: PUT - Atualiza um produto pelo id
app.put('/v1/saveeats/restaurante/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idRestaurante = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerProcedure.atualizarCadastroRestaurante(dadosBody, idRestaurante);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

})
//EndPoint: GET - Retorna todos restaurantes
app.get('/v1/saveeats/restaurantes', cors(), async function (request, response) {

    let dados = await controllerRestaurante.getRestaurantes();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna o restaurante existente no banco pelo email e senha
app.get('/v1/saveeats/restaurante/email/:email/senha/:senha',cors(),async function(request, response) {

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

//EndPoint: POST - Passar dados do login no body para autenticacao
app.post('/v1/saveeats/restaurante/login/autenticar', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let body = request.body

        let resulDados = await controllerRestaurante.autenticarLoginRestauranteEmailSenha(body.email,body.senha)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna o restaurante filtrando pelo nome
app.get('/v1/saveeats/restaurante/nome-fantasia/:nome', cors(), async function (request, response) {

    let nome = request.params.nome;

    let dadosRestaurante = await controllerRestaurante.getFiltrarRestauranteNome(nome);

    if (dadosRestaurante) {
        response.json(dadosRestaurante);
        response.status(200);
    } else {
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});

//EndPoint: GET - Retorna as CATEGORIAS de um restaurante específico pelo nome fantasia
app.get('/v1/saveeats/restaurante/categorias/nome-fantasia/:nomefantasia', cors(), async function (request, response) {

    let nomefantasia = request.params.nomefantasia; // Correção aqui

    let dadosRestaurante = await controllerRestaurante.getCategoriasRestaurantePeloNomeFantasia(nomefantasia);

    if (dadosRestaurante) {
        response.json(dadosRestaurante);
        response.status(200);
    } else {    
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});

//EndPoint: GET - Retorna os PRODUTOS de um restaurante específico pelo nome fantasia
app.get('/v1/saveeats/restaurante/produtos/nome-fantasia/:nomefantasia', cors(), async function (request, response) {

    let nomefantasia = request.params.nomefantasia; 

    let dadosRestaurante = await controllerRestaurante.getProdutosRestaurantePeloNomeFantasia(nomefantasia);

    if (dadosRestaurante) {
        response.json(dadosRestaurante);
        response.status(200);
    } else {
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});

//EndPoint: GET - Retorna os PRODUTOS de um restaurante específico pelo id do restaurante
app.get('/v1/saveeats/restaurante/produtos/id-restaurante/:idRestaurante/nome-produto/:nomeProduto', cors(), async function (request, response) {

    let nomeProduto = request.params.nomeProduto; 

    let idRestaurante = request.params.idRestaurante; 

    let dados = await controllerRestaurante.getProdutosRestaurantePeloIdRestaurante(nomeProduto,idRestaurante);

    if (dados) {
        response.json(dados);
        response.status(200);
    } else {
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});

//Home - produtos pausados
//EndPoint: GET - Retorna os PRODUTOS com o STATUS PAUSADO de um restaurante específico pelo id do restaurante
app.get('/v1/saveeats/restaurante/produtos-pausados/idRestaurante/:idRestaurante', cors(), async function (request, response) {

    let idRestaurante = request.params.idRestaurante; 

    let dadosRestaurante = await controllerRestaurante.getProdutosPausadosDoRestaurantePeloIdDoRestaurante(idRestaurante);

    if (dadosRestaurante) {
        response.json(dadosRestaurante);
        response.status(200);
    } else {
        console.log(dadosRestaurante);
        console.log('Está caindo aqui?');
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});

//Home - pedidos cancelados
//EndPoint: GET - Retorna os PEDIDOS cancelados de um restaurante específico pelo id do restaurante
app.get('/v1/saveeats/restaurante/pedidos-cancelados/idRestaurante/:idRestaurante', cors(), async function (request, response) {

    let idRestaurante = request.params.idRestaurante; 

    let dadosRestaurante = await controllerRestaurante.getPedidosCanceladosPeloIdDoRestaurante(idRestaurante);

    if (dadosRestaurante) {
        response.json(dadosRestaurante);
        response.status(200);
    } else {
        console.log(dadosRestaurante);
        console.log('Está caindo aqui?');
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});


//EndPoint: GET - Retorna os as formas de pagamento de um restaurante
app.get('/v1/saveeats/restaurante/forma-pagamento/idRestaurante/:idRestaurante', cors(), async function (request, response) {

    let idRestaurante = request.params.idRestaurante; 

    let dadosRestaurante = await controllerRestaurante.getFormaPagamentoPeloIdDoRestaurante(idRestaurante);

    if (dadosRestaurante) {
        response.json(dadosRestaurante);
        response.status(200);
    } else {
        console.log(dadosRestaurante);
        console.log('Está caindo aqui?');
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});


//EndPoint: POST - Restaurante aceitar formas de pagamentos existentes no banco (PROCEDURE)
app.post('/v1/saveeats/restaurante/aceitar/formas-pagamentos',cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerProcedure.inserirFormaPagamentoRestaurante(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todas areas de entrega de um restaurante
app.get('/v1/saveeats/restaurante/frete-area-entrega/idRestaurante/:idRestaurante', cors(), async function (request, response) {

    let idRestaurante = request.params.idRestaurante; 

    let dadosRestaurante = await controllerRestaurante.getFreteAreaEntregaIdDoRestaurante(idRestaurante);

    if (dadosRestaurante) {
        response.json(dadosRestaurante);
        response.status(200);
    } else {
        console.log(dadosRestaurante);
        console.log('Está caindo aqui?');
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});


//EndPoint: POST - Restaurante adicionar suas areas de entrega (PROCEDURE)
app.post('/v1/saveeats/restaurante/frete-area-entrega',cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerProcedure.restauranteInserirSuasAreasDeEntrega(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: GET - Retorna o raio de entrega de um restaurante
app.get('/v1/saveeats/restaurante/raio-entrega/idRestaurante/:idRestaurante', cors(), async function (request, response) {

    let idRestaurante = request.params.idRestaurante;

    let dadosRestaurante = await controllerRestaurante.getRaioEntregaByIdDoRestaurante(idRestaurante);

    if (dadosRestaurante) {
        response.json(dadosRestaurante);
        response.status(200);
    } else {
        console.log(dadosRestaurante);
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
});


//EndPoint: PUT - Atualiza o raio de entrega de um restaurante pelo id
app.put('/v1/saveeats/restaurante/raio-entrega', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body;

        let resultDados = await controllerRestaurante.atualizarRaioEntregaByIdDoRestaurante(dadosBody);
        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

});

//EndPoint: PUT - Restaurante atualizar o status de um pedido
app.put('/v1/saveeats/status-pedido', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body;

        let resultDados = await controllerPedido.restauranteAtualizarStatusDoPedido(dadosBody);
        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

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



// Endpoint: GET - Retorna os restaurantes de uma categoria específica pelo nome da categoria
app.get('/v1/saveeats/restaurante/:categoria', cors(), bodyParserJSON, async function (request, response) {

    let nomeCategoria = request.params.categoria; 

    let dados = await controllerCategoriaRestaurante.getRestaurantePelaCategoria(nomeCategoria);

    if (dados) {
        response.json(dados);
        response.status(200);
    } else {
        response.status(message.ERROR_NOT_FOUND.status)
        response.json(message.ERROR_NOT_FOUND)
    }
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

//EndPoint: PROCEDURE - ENDERECO CLIENTE
app.post('/v1/saveeats/endereco/cliente/procedure', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerProcedure.inserirEnderecoClienteCadastro(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


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


//EndPoint: GET - Retorna detalhes DICAS
app.get('/v1/saveeats/detalhes/dicas/id/:id', cors(), async function (request, response) {
    try {
        const id = request.params.id;
        const dados = await controllerDicas.getDetalhesDicaID(id);

        response.status(dados.status).json(dados);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

//EndPoint: GET - AS DICAS DE UMA CATEGORIA
app.get('/v1/saveeats/dicas/categoria/idCategoria/:id', cors(), async function (request, response) {

    const id = request.params.id;
    let dados = await controllerDicas.getDicasByIdCategoria(id);

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

/********************************
* Objetivo : API de controle da tabela restaurante_frete_area_entrega
* Data : 07/09/2023
********************************/

//EndPoint: POST - Insere uma novo registro na tabela restaurante_frete_area_entrega
app.post('/v1/saveeats/restaurante/frete/area/entrega', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerRestauranteFreteAreaEntrega.inserirRestauranteFreteAreaEntrega(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: PUT - Atualiza registro da tabela restaurante_frete_area_entrega por id
app.put('/v1/saveeats/restaurante/frete/area/entrega/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idRestauranteFreteAreaEntrega = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerRestauranteFreteAreaEntrega.atualizarRestauranteFreteAreaEntrega(dadosBody, idRestauranteFreteAreaEntrega);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: DELETE - Exclui um registro da tabela restaurante_frete_area_entrega
app.delete('/v1/saveeats/restaurante/frete/area/entrega/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idRestauranteFreteAreaEntrega = request.params.id;

    let resultDados = await controllerRestauranteFreteAreaEntrega.deletarRestauranteFreteAreaEntrega(idRestauranteFreteAreaEntrega)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


//EndPoint: GET - Retorna todos registro da tabela restaurante_frete_area_entrega
app.get('/v1/saveeats/restaurante/frete/area/entrega', cors(), async function (request, response) {

    let dados = await controllerRestauranteFreteAreaEntrega.getRestauranteFreteAreaEntrega();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/restaurante/frete/area/entrega/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerRestauranteFreteAreaEntrega.getRestauranteFreteAreaEntregaPorID(id)

    response.status(dados.status)
    response.json(dados)
});


/********************************
* Objetivo : API de controle da tabela favoritos
* Data : 07/09/2023
********************************/

//EndPoint: POST - Insere uma novo registro na tabela favoritos
app.post('/v1/saveeats/restaurantes/favoritos/cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerFavoritos.inserirFavoritos(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

app.put('/v1/saveeats/restaurantes/favoritos/cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idFavoritos = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerFavoritos.atualizarFavoritos(dadosBody, idFavoritos);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registro da tabela favoritos
app.get('/v1/saveeats/restaurantes/favoritos/clientes', cors(), async function (request, response) {

    let dados = await controllerFavoritos.getFavoritos();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/restaurantes/favoritos/clientes/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerFavoritos.getFavoritosPorID(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: DELETE - Exclui um registro da tabela favoritos
app.delete('/v1/saveeats/restaurantes/favoritos/clientes/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idFavoritos = request.params.id;

    let resultDados = await controllerFavoritos.deletarFavoritos(idFavoritos)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


/********************************
* Objetivo : API de controle da tabela forma de pagamento
* Data : 07/09/2023
********************************/

//EndPoint: POST - Insere uma novo registro na tabela forma_pagamento
app.post('/v1/saveeats/forma/pagamento', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerFormaPagamento.inserirFormaPagamento(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//Verificar
//EndPoint: PUT - Atualiza uma forma de pagamento pelo id
app.put('/v1/saveeats/forma/pagamento/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idFormaPagamento = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerFormaPagamento.atualizarFormaPagamento(dadosBody, idFormaPagamento);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: GET - Retorna todos registro da forma de pagamento
app.get('/v1/saveeats/forma/pagamento', cors(), async function (request, response) {

    let dados = await controllerFormaPagamento.getFormaPagamento();

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/forma/pagamento/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerFormaPagamento.getFormaPagamentoPorID(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: DELETE - Exclui um registro da forma_pagamento
app.delete('/v1/saveeats/forma/pagamento/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idFormaPagamento = request.params.id;

    let resultDados = await controllerFormaPagamento.deletarFormaPagamento(idFormaPagamento)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


///////////////////////////////////////// Restaurante Forma Pagamento  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Restaurante Forma Pagamento
* Data : 07/09/2023
********************************/


//EndPoint: POST - Insere um novo registro na tabela restaurante_forma_pagamento
app.post('/v1/saveeats/restaurante/forma/pagamento', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerRestauranteFormaPagamento.inserirRestauranteFormaPagamento(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: PUT - Atualiza dados da tabela restaurante_forma_pagamento pelo id
app.put('/v1/saveeats/restaurante/forma/pagamento/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idRestauranteFormaPagamento = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerRestauranteFormaPagamento.atualizarRestauranteFormaPagamento(dadosBody,idRestauranteFormaPagamento);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registro da tabela restaurante_forma_pagamento
app.get('/v1/saveeats/restaurante/forma/pagamento', cors(), async function (request, response) {

    let dados = await controllerRestauranteFormaPagamento.getRestauranteFormaPagamento();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: DELETE - Exclui um registro da tabela restaurante_forma_pagamento
app.delete('/v1/saveeats/restaurante/forma/pagamento/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idRestauranteFormaPagamento = request.params.id;

    let resultDados = await controllerRestauranteFormaPagamento.deletarRestauranteFormaPagamento(idRestauranteFormaPagamento)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


/////////////////////////////////////////Status  Pedido  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Status Pedido
* Data : 07/09/2023
********************************/

//EndPoint: POST - Insere um novo status de pedido
app.post('/v1/saveeats/status/pedido', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerStatusPedido.inserirStatusPedido(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: PUT - Atualiza dados da tabela status_pedido pelo id
app.put('/v1/saveeats/status/pedido/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idStatusPedido = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerStatusPedido.atualizarStatusPedido(dadosBody,idStatusPedido);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: GET - Retorna todos registro da tabela status_pedido
app.get('/v1/saveeats/status/pedido', cors(), async function (request, response) {

    let dados = await controllerStatusPedido.getStatusPedido();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/status/pedido/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerStatusPedido.getStatusPedidoPorID(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: DELETE - Exclui um registro da tabela status_pedido
app.delete('/v1/saveeats/status/pedido/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idStatusPedido = request.params.id;

    let resultDados = await controllerStatusPedido.deletarStatusPedido(idStatusPedido)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


///////////////////////////////////////// Pedido  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Pedido
* Data : 07/09/2023
********************************/


//EndPoint: POST - Insere um novo pedido - crud basico
app.post('/v1/saveeats/pedido', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerPedido.inserirPedido(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: POST - CLIENTE INSERIR UM PEDIDO - PROCEDURE
app.post('/v1/saveeats/cliente/pedido', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerProcedure.clienteInserirPedido(dadosBody)
        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: PUT - Atualiza um pedido pelo id
app.put('/v1/saveeats/pedido/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idPedido = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerPedido.atualizarPedido(dadosBody,idPedido);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registro da tabela pedido
app.get('/v1/saveeats/pedido', cors(), async function (request, response) {

    let dados = await controllerPedido.getPedidos();

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/pedido/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerPedido.getPedidoPorID(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: DELETE - Exclui um registro da pedido
app.delete('/v1/saveeats/pedido/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idPedido = request.params.id;

    let resultDados = await controllerPedido.deletarPedido(idPedido)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});



//EndPoint: GET - Retorna  todos detalhes de pedido por id
app.get('/v1/saveeats/detalhes/pedido/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerPedido.getDetalhesPedidoPorID(id)

    response.status(dados.status)
    response.json(dados)
});


//EndPoint: GET - Retorna  todos pedidos e seus detalhes
app.get('/v1/saveeats/detalhes/pedido/', cors(), bodyParserJSON, async function (request, response) {


    let dados = await controllerPedido.getDetalhesPedido()

    response.status(dados.status)
    response.json(dados)
});


//EndPoint: GET - Retorna  pedidos de um restaurante
app.get('/v1/saveeats/detalhes/pedido/idRestaurante/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerPedido.getDetalhesPedidoPorIDRestaurante(id)

    response.status(dados.status)
    response.json(dados)
});


//EndPoint: GET - Retorna  pedidos de um restaurante pelo id restaurante e pelo numero do pedido
app.get('/v1/saveeats/detalhes/pedido/idRestaurante/:id/numeroPedido/:numeroPedido', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let numeroPedido = request.params.numeroPedido

    let dados = await controllerPedido.getDetalhesPedidoPorIDRestauranteNumeroPedido(id,numeroPedido)

    response.status(dados.status)
    response.json(dados)
});


//EndPoint: GET - Retorna  pedidos de um cliente
app.get('/v1/saveeats/detalhes/pedido/idCliente/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerPedido.getDetalhesPedidoPorIDCliente(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: GET - Retornar o status do pedido pelo id do pedido
app.get('/v1/saveeats/status-pedido/idPedido/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerPedido.getStatusPedidoPorIDPedido(id)

    response.status(dados.status)
    response.json(dados)
});


///////////////////////////////////////// Recomendacao  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Recomendacao
* Data : 10/09/2023
********************************/


//EndPoint: POST - Insere uma nova recomendacao
app.post('/v1/saveeats/recomendacao', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerRecomendacao.inserirRecomendacao(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: PUT - Atualiza uma recomendacao pelo id
app.put('/v1/saveeats/recomendacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idRecomendacao = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerRecomendacao.atualizarRecomendacao(dadosBody,idRecomendacao);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: GET - Retorna todos registro da tabela recomendacao
app.get('/v1/saveeats/recomendacao', cors(), async function (request, response) {

    let dados = await controllerRecomendacao.getRecomendacao();

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/recomendacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerRecomendacao.getRecomendacaoPorID(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: DELETE - Exclui um registro de recomendacao
app.delete('/v1/saveeats/recomendacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idRecomendacao = request.params.id;

    let resultDados = await controllerRecomendacao.deletarRecomendacao(idRecomendacao)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


///////////////////////////////////////// Avaliacao  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Avaliacao
* Data : 10/09/2023
********************************/


//EndPoint: POST - Insere uma nova avaliacao
app.post('/v1/saveeats/avaliacao', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerAvaliacao.inserirAvaliacao(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: PUT - Atualiza uma avaliacao
app.put('/v1/saveeats/avaliacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idAvaliacao = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerAvaliacao.atualizarAvaliacao(dadosBody,idAvaliacao);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registro da tabela avaliacao
app.get('/v1/saveeats/avaliacao', cors(), async function (request, response) {

    let dados = await controllerAvaliacao.getAvaliacao();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/avaliacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerAvaliacao.getAvaliacaoPorID(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: DELETE - Exclui um registro de avaliacao
app.delete('/v1/saveeats/avaliacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idAvaliacao = request.params.id;

    let resultDados = await controllerAvaliacao.deletarAvaliacao(idAvaliacao)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

///////////////////////////////////////// Avaliacao_Recomendacao  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Avaliacao_Recomendacao
* Data : 10/09/2023
********************************/


//EndPoint: POST - Insere um id de avaliacao e um id de recomendacao
app.post('/v1/saveeats/avaliacao-recomendacao', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerAvaliacaoRecomendacao.inserirAvaliacaoRecomendacao(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: PUT - Atualiza os id
app.put('/v1/saveeats/avaliacao-recomendacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idAvaliacaoRecomendacao = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerAvaliacaoRecomendacao.atualizarAvaliacaoRecomendacao(dadosBody,idAvaliacaoRecomendacao);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: GET - Retorna todos registro da tabela avaliacao_recomendacao
app.get('/v1/saveeats/avaliacao-recomendacao', cors(), async function (request, response) {

    let dados = await controllerAvaliacaoRecomendacao.getAvaliacaoRecomendacao();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/avaliacao-recomendacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerAvaliacaoRecomendacao.getAvaliacaoRecomendacaoPorID(id)

    response.status(dados.status)
    response.json(dados)
});


//EndPoint: DELETE - Exclui um registro da tabela pelo id
app.delete('/v1/saveeats/avaliacao-recomendacao/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idAvaliacaoRecomendacao = request.params.id;

    let resultDados = await controllerAvaliacaoRecomendacao.deletarAvaliacaoRecomendacao(idAvaliacaoRecomendacao)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


///////////////////////////////////////// Restaurante_Pedido_Cliente  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Restaurante_Pedido_Cliente
* Data : 11/09/2023
********************************/


//EndPoint: POST - Insere um id do restaurante,do pedido e do cliente 
app.post('/v1/saveeats/restaurante-pedido-cliente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerRestaurantePedidoCliente.inserirRestaurantePedidoCliente(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: PUT - Atualiza os id
app.put('/v1/saveeats/restaurante-pedido-cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idRestaurantePedidoCliente = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerRestaurantePedidoCliente.atualizarRestaurantePedidoCliente(dadosBody,idRestaurantePedidoCliente);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna todos registro da tabela restaurante_pedido_cliente
app.get('/v1/saveeats/restaurante-pedido-cliente', cors(), async function (request, response) {

    let dados = await controllerRestaurantePedidoCliente.getRestaurantePedidoCliente();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/restaurante-pedido-cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerRestaurantePedidoCliente.getRestaurantePedidoClientePorID(id)

    response.status(dados.status)
    response.json(dados)
});


//EndPoint: DELETE - Exclui um registro da tabela pelo id
app.delete('/v1/saveeats/restaurante-pedido-cliente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idRestaurantePedidoCliente = request.params.id;

    let resultDados = await controllerRestaurantePedidoCliente.deletarRestaurantePedidoCliente(idRestaurantePedidoCliente)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


///////////////////////////////////////// Pedido_Produto  //////////////////////////////////////////////

////////////////////////////////AINDA IREI TESTAR OS ENDPOINTS DESSA TABELA /////////////////////////////

/********************************
* Objetivo : API de controle de Pedido_Produto
* Data : 11/09/2023
********************************/

//EndPoint: POST - Insere um id do pedido e do produto
app.post('/v1/saveeats/pedido-produto', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerPedidoProduto.inserirPedidoProduto(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: PUT - Atualiza os id
app.put('/v1/saveeats/pedido-produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idPedidoProduto = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerPedidoProduto.atualizarPedidoProduto(dadosBody,idPedidoProduto);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: GET - Retorna todos registro da tabela pedido_produto
app.get('/v1/saveeats/pedido-produto', cors(), async function (request, response) {

    let dados = await controllerPedidoProduto.getPedidoProduto();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: GET - Retorna  pelo id
app.get('/v1/saveeats/pedido-produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerPedidoProduto.getPedidoProdutoPorID(id)

    response.status(dados.status)
    response.json(dados)
});


//EndPoint: DELETE - Exclui um registro da tabela pelo id
app.delete('/v1/saveeats/pedido-produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idPedidoProduto = request.params.id;

    let resultDados = await controllerPedidoProduto.deletarPedidoProduto(idPedidoProduto)

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

//EndPoint: POST - Insere uma novo registro na tabela produto - PROCEDURE
app.post('/v1/saveeats/produto', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resulDados = await controllerProcedure.inserirProdutoNoCardapio(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//EndPoint: PUT - Atualiza um produto pelo id
app.put('/v1/saveeats/produto/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idProduto = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerProcedure.atualizarProdutoNoCardapio(dadosBody, idProduto);

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
* Objetivo : API de controle de Categoria Produto
* Data : 06/09/2023
********************************/


//EndPoint: GET - Retorna todos registro da tabela status produto
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


///////////////////////////////////////// Categoria Receitas //////////////////////////////////////////////

/********************************
* Objetivo : API de controle da Categoria das Receitas
* Data : 11/09/2023
********************************/

//EndPoint: POST - Insere uma novo registro na tabela categoria receitas
app.post('/v1/saveeats/categoria/receitas', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resulDados = await controllerCategoriaReceitas.inserirCategoriaReceitas(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//EndPoint: PUT - Atualiza registro da tabela categoria_receitas pelo id
app.put('/v1/saveeats/categoria/receitas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idCategoriaReceitas = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerCategoriaReceitas.atualizarCategoriaReceitas(dadosBody, idCategoriaReceitas)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

})


//EndPoint: DELETE - Deleta um registro da tabela categoria_receitas pelo id
app.delete('/v1/saveeats/categoria/receitas/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCategoriaReceitas = request.params.id;

    let resultDados = await controllerCategoriaReceitas.deletarCategoriaReceitas(idCategoriaReceitas)

    response.status(resultDados.status)
    response.json(resultDados)

})


//EndPoint: GET - Retorna todos registro da tabela categoria_receitas
app.get('/v1/saveeats/categoria/receitas', cors(), async function (request, response) {

    let dadosCategoriaReceitas = await controllerCategoriaReceitas.getCategoriaReceitas();

    response.status(dadosCategoriaReceitas.status)
    response.json(dadosCategoriaReceitas)

})

//EndPoint: GET - Retorna um registro da tabela categoria_receitas pelo id
app.get('/v1/saveeats/categoria/receitas/id/:id', cors(), async function (request, response) {

    let idCategoriaReceitas = request.params.id

    let dadosCategoriaReceitas = await controllerCategoriaReceitas.getCategoriaReceitasPorID(idCategoriaReceitas)

    response.status(dadosCategoriaReceitas.status)
    response.json(dadosCategoriaReceitas)

});

///////////////////////////////////////// Tempo Preparo  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle de tempo_preparo
* Data : 11/09/2023
********************************/

//EndPoint: POST - Insere uma novo registro na tabela tempo_preparo
app.post('/v1/saveeats/tempo-preparo', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resulDados = await controllerTempoPreparo.inserirTempoPreparo(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

});

//EndPoint: GET - Retorna todos tempo_preparo registrados
app.get('/v1/saveeats/tempo-preparo', cors(), async function (request, response) {

    let dadosTempoPreparo = await controllerTempoPreparo.getTempoPreparo();

    response.status(dadosTempoPreparo.status)
    response.json(dadosTempoPreparo)

});

//EndPoint: DELETE - Deleta um registro da tabela tempo_preparo
app.delete('/v1/saveeats/tempo-preparo/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idTempoPreparo = request.params.id;

    let resultDados = await controllerTempoPreparo.deletarTempoPreparo(idTempoPreparo)

    response.status(resultDados.status)
    response.json(resultDados)

});

//EndPoint: PUT - Atualiza um tempo_preparo
app.put('/v1/saveeats/tempo-preparo/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idTempoPreparo = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerTempoPreparo.atualizarTempoPreparo(dadosBody, idTempoPreparo)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

});

///////////////////////////////////////// Nivel Dificuldade  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle de nivel_dificuldade
* Data : 14/09/2023
********************************/

//EndPoint: POST - Insere uma novo registro na tabela nivel_dificuldade
app.post('/v1/saveeats/nivel-dificuldade', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body;

        // Agora, você chama a função corretamente
        let resultDados = await controllerNivelDificuldade.inserirNivelDificuldade(dadosBody);

        response.status(resultDados.status);
        response.json(resultDados);
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
        response.json(message.ERROR_INVALID_CONTENT_TYPE);
    }
});

//EndPoint: PUT - Atualiza registro da tabela nivel_dificuldade
app.put('/v1/saveeats/nivel-dificuldade/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idNivelDificuldade = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerNivelDificuldade.atualizarNivelDificuldade(dadosBody, idNivelDificuldade)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

});

//EndPoint: GET - Retorna todos niveis de dificuldade registrados
app.get('/v1/saveeats/nivel-dificuldade', cors(), async function (request, response) {

    let dadosNivelDificuldade = await controllerNivelDificuldade.getNivelDificuldade();

    response.status(dadosNivelDificuldade.status)
    response.json(dadosNivelDificuldade)

});

//EndPoint: DELETE - Deleta um registro da tabela nivel_dificuldade
app.delete('/v1/saveeats/nivel-dificuldade/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idNivelDificuldade = request.params.id;

    let resultDados = await controllerNivelDificuldade.deletarNivelDificuldade(idNivelDificuldade)

    response.status(resultDados.status)
    response.json(resultDados)

});



///////////////////////////////////////// Ingrediente  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle de tbl_ingrediente
* Data : 18/09/2023
********************************/

//EndPoint: POST - Insere uma novo registro na tabela nivel_dificuldade
app.post('/v1/saveeats/ingrediente', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body;

 
        let resultDados = await controllerIngrediente.inserirIngrediente(dadosBody);

        response.status(resultDados.status);
        response.json(resultDados);
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
        response.json(message.ERROR_INVALID_CONTENT_TYPE);
    }
});

// EndPoint : GET - Retorna todos ingredientes 
app.get('/v1/saveeats/ingredientes', cors(), async function (request, response) {

    let dadosIngrediente = await controllerIngrediente.getIngrediente();

    response.status(dadosIngrediente.status)
    response.json(dadosIngrediente)

})


//EndPoint: DELETE - Deleta um ingrediente
app.delete('/v1/saveeats/ingrediente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idIngrediente = request.params.id;

    let resultDados = await controllerIngrediente.deletarIngrediente(idIngrediente)

    response.status(resultDados.status)
    response.json(resultDados)

});


//EndPoint: PUT - Atualiza um ingrediente
app.put('/v1/saveeats/ingrediente/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idIngrediente = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerIngrediente.atualizarIngrediente(dadosBody, idIngrediente)

        //response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

});

/////////////////////////////////////////  VIEWS  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle das views do banco de dados
* Data : 15/09/2023
********************************/

// PEDIDO - PRODUTO
app.get('/v1/saveeats/pedido-produtos', cors(), async function (request, response) {

    let dadosPedidosProdutos = await controllerViews.getViewsPedidoProduto();

    response.status(dadosPedidosProdutos.status)
    response.json(dadosPedidosProdutos)

})


/////////////////////////////////////////  Receitas Ingredientes  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle da tbl_receitas_ingrediente
* Data : 05/10/2023
********************************/

//so fiz o post da tbl_receitas_ingrediente
//EndPoint: POST - IDS Das Receitas e dos Ingredientes
app.post('/v1/saveeats/receita/ingrediente', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerReceitasIngredientes.inserirReceitasIngredientes(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});



/////////////////////////////////////////  Receitas  //////////////////////////////////////////////

/********************************
* Objetivo : API de controle da tbl_receitas_
* Data : 05/10/2023
********************************/


//EndPoint: POST - Adicionar uma receita
app.post('/v1/saveeats/receita', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerReceitas.inserirReceitas(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: GET - Retorna os detalhes de uma receita pelo id
app.get('/v1/saveeats/detalhes/receitas/id/:id', cors(), async function (request, response) {

    let idReceita = request.params.id
    console.log('porra');
    let dadosReceitas = await controllerReceitas.getDetalhesReceitaPorId(idReceita)

    response.status(dadosReceitas.status)
    response.json(dadosReceitas)

});

//EndPoint: GET - Retorna os detalhes de uma receita filtrando pela categoria
app.get('/v1/saveeats/receita/categoria/nome-categoria/:categoria', cors(), async function (request, response) {

    let nomeCategoria = request.params.categoria
    console.log('porra');
    let dadosReceitas = await controllerReceitas.getFiltrarReceitaPelaCategoria(nomeCategoria)

    response.status(dadosReceitas.status)
    response.json(dadosReceitas)

});


//EndPoint: GET - Retorna todas receitas
app.get('/v1/saveeats/receitas/', cors(), async function (request, response) {


    let dadosReceitas = await controllerReceitas.getReceitas()

    response.status(dadosReceitas.status)
    response.json(dadosReceitas)

});


//EndPoint: DELETE - Deleta uma receita pelo id
app.delete('/v1/saveeats/receita/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idReceita = request.params.id;

    let resultDados = await controllerReceitas.deletarReceita(idReceita)

    response.status(resultDados.status)
    response.json(resultDados)

})


//EndPoint: PUT - Atualiza um produto pelo id
app.put('/v1/saveeats/receita/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idReceita = request.params.id;

        let dadosBody = request.body;

        let resultDados = await controllerReceitas.atualizarReceita(dadosBody, idReceita);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }

})







///////////////////////////////////////// Intermed_Categoria_Receitas  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle da tbl_intermed_categoria_receitas
* Data : 06/10/2023
********************************/


//EndPoint: POST - Adicionar os id de uma receita e de uma categoria_receita na tabela intermediaria
app.post('/v1/saveeats/intermed-categoria-receitas', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerIntermedCategoriaReceitas.inserirIntermedCategoriReceitas(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});



/* ***************************************************************************************************************************************************
 * Objetivo : API para integração da API de pagamento do mercado pago somente o get.
 * Autor : Caroline Portela
 * Data 05/09/2023
 * Versão : 1.0 
 *************************************************************************************************************************************************** */

// const mercadoPago = require('mercadopago');
const axios = require('axios');
const mercadopagoAccessToken = 'TEST-4600314104156538-100512-94d8d18c090395b88b69c7aab3f71baa-1501647086';

// Rota para obter dados da API do Mercado Pago
app.get('/v1/saveeats/obter-dados-do-mercado-pago', async (req, res) => {
  try {
    // Fazer uma chamada à API do Mercado Pago
    const response = await axios.get('https://api.mercadopago.com/v1/payment_methods', {
      headers: {
        'Authorization': `Bearer ${mercadopagoAccessToken}`,
      },
    });

    // Retornar os dados da API do Mercado Pago para o frontend
    return res.json(response.data);
  } catch (error) {
    console.error('Erro ao obter dados do Mercado Pago:', error);
    return res.status(500).json({ error: 'Erro ao obter dados do Mercado Pago' });
  }
});



///////////////////////////////////////// Pedido em tempo real  //////////////////////////////////////////////


/********************************
* Objetivo : API de controle da tbl_pedido com web.sockets
* Data : 23/10/2023
********************************/

// importa o módulo 'http' para criar um servidor HTTP
const http = require('http');


// importa o módulo 'socket.io' para configurar WebSocket
const socketIO = require('socket.io');


// 'app' é a aplicação Express
// cria um servidor HTTP usando o Express como manipulador de solicitações
const server = http.createServer(app); 

// configura o WebSocket no mesmo servidor HTTP
const io = socketIO(server);

// configura um tratamento para quando um cliente se conecta/desconecta
// registra no console quando um cliente se conecta/desconecta
io.on('connection', (socket) => {

    console.log('Cliente conectado');
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

app.post('/v1/saveeats/cliente/pedido/teste/websockets', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        
        let dadosBody = request.body

        let resulDados = await controllerProcedure.clienteInserirPedido(dadosBody)
        
        // aqui, após salvar o pedido no banco de dados, emite uma notificação em tempo real para o front-end do restaurante
        // emite o evento 'novo_pedido'
        //o restaurante precisa estar escutando esse evento no web
        io.emit('novo_pedido', dadosBody); 

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});









app.listen(8080, function () {
    console.log('Servidor aguardando requisição na porta 8080')
})


