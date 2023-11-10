/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente as procedures
 * Data: 14/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

//Import dos arquivos DAO para importar funções necessarias para verificações
var proceduresDAO = require('../model/DAO/procedureDAO.js')
var restauranteDAO = require('../model/DAO/restauranteDAO.js')
var clienteDAO = require('../model/DAO/clienteDAO.js')
var statusProdutoDAO = require('../model/DAO/status_produtoDAO.js')
var categoriaProdutoDAO = require('../model/DAO/categoria_produtoDAO.js')
var formaPagamentoDAO = require('../model/DAO/forma_de_pagamentoDAO.js')
var freteAreaEntregaDAO = require('../model/DAO/frete_area_entregaDAO.js')
var diaSemanaDAO = require('../model/DAO/dia_semanaDAO.js')

//funcao para fazer o cadastro do restaurante 
const inserirCadastroProcedureRestaurante = async (dadosCadastro) => {

    if (dadosCadastro.nome_categoria == '' || dadosCadastro.nome_categoria == undefined ||
        dadosCadastro.nome_estado == '' || dadosCadastro.nome_estado == undefined ||
        dadosCadastro.nome_cidade == '' || dadosCadastro.nome_cidade == undefined ||
        dadosCadastro.rua == '' || dadosCadastro.rua == undefined ||
        dadosCadastro.cep == '' || dadosCadastro.cep == undefined ||
        dadosCadastro.bairro == '' || dadosCadastro.bairro == undefined ||
        dadosCadastro.numero == '' || dadosCadastro.numero == undefined ||
        dadosCadastro.nome_proprietario == '' || dadosCadastro.nome_proprietario == undefined ||
        dadosCadastro.razao_social == '' || dadosCadastro.razao_social == undefined ||
        dadosCadastro.nome_fantasia == '' || dadosCadastro.nome_fantasia == undefined ||
        dadosCadastro.email == '' || dadosCadastro.email == undefined ||
        dadosCadastro.senha == '' || dadosCadastro.senha == undefined ||
        dadosCadastro.cnpj == '' || dadosCadastro.cnpj == undefined ||
        dadosCadastro.numero_telefone == '' || dadosCadastro.numero_telefone == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {

        //verifica se o email inserido no cadastro ja e cadastrado
        const emailExistente = await restauranteDAO.verificarEmailExistenteRestaurante(dadosCadastro.email);
        if (emailExistente) {
            return message.ERROR_EMAIL_ALREADY_EXISTS;
        }

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.proceduresRestauranteCadastro(dadosCadastro)

        if (resultadoDados) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}


//funcao para atualizar dados de um restaurante
const atualizarCadastroRestaurante = async (dadosRestaurante) => {     
    if (
        dadosRestaurante.id_restaurante === undefined || dadosRestaurante.id_restaurante === null ||dadosRestaurante.id_restaurante === '' ||
        dadosRestaurante.nome_proprietario === undefined || dadosRestaurante.nome_proprietario === null ||dadosRestaurante.nome_proprietario === '' ||
        dadosRestaurante.nome_fantasia === undefined || dadosRestaurante.nome_fantasia === null ||dadosRestaurante.nome_fantasia === '' ||
        dadosRestaurante.razao_social === undefined || dadosRestaurante.razao_social === null ||dadosRestaurante.razao_social === '' ||
        dadosRestaurante.email === undefined || dadosRestaurante.email === null ||dadosRestaurante.email === '' ||
        dadosRestaurante.senha === undefined || dadosRestaurante.senha === null ||dadosRestaurante.senha === '' ||
        dadosRestaurante.cnpj === undefined || dadosRestaurante.cnpj === null ||dadosRestaurante.cnpj === '' ||
        dadosRestaurante.categoria_restaurante === undefined || dadosRestaurante.categoria_restaurante === null ||dadosRestaurante.categoria_restaurante === '' ||
        dadosRestaurante.numero_telefone === undefined || dadosRestaurante.numero_telefone === null ||dadosRestaurante.numero_telefone === '' ||
        dadosRestaurante.id_endereco_restaurante === undefined || dadosRestaurante.id_endereco_restaurante === null ||dadosRestaurante.id_endereco_restaurante === '' ||
        dadosRestaurante.rua === undefined || dadosRestaurante.rua === null ||dadosRestaurante.rua === '' ||
        dadosRestaurante.cep === undefined || dadosRestaurante.cep === null ||dadosRestaurante.cep === '' ||
        dadosRestaurante.bairro === undefined || dadosRestaurante.bairro === null ||dadosRestaurante.bairro === '' ||
        dadosRestaurante.numero === undefined || dadosRestaurante.numero === null ||dadosRestaurante.numero === '' ||
        dadosRestaurante.nome_cidade === undefined || dadosRestaurante.nome_cidade === null ||dadosRestaurante.nome_cidade === '' ||
        dadosRestaurante.nome_estado === undefined || dadosRestaurante.nome_estado === null ||dadosRestaurante.nome_estado === '' 
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {

        let dadosJSON = {}
    
        const resultadoDados = await proceduresDAO.procedureUpdateDadosRestaurante(dadosRestaurante);

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_UPDATED_ITEM.status;
            dadosJSON.message = message.SUCESS_UPDATED_ITEM.message;
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}




//funcao pra fazer cadastro do cliente
const inserirCadastroCliente = async (dadosCliente) => {

    if (
        dadosCliente.nome == '' || dadosCliente.nome == undefined ||
        dadosCliente.email == '' || dadosCliente.email == undefined ||
        dadosCliente.senha == '' || dadosCliente.senha == undefined ||
        dadosCliente.cpf == '' || dadosCliente.cpf == undefined ||
        dadosCliente.telefone == '' || dadosCliente.telefone == undefined ||
        dadosCliente.cep == '' || dadosCliente.cep == undefined ||
        dadosCliente.logradouro == '' || dadosCliente.logradouro == undefined ||
        dadosCliente.bairro == '' || dadosCliente.bairro == undefined ||
        dadosCliente.localidade == '' || dadosCliente.localidade == undefined ||
        dadosCliente.numero == '' || dadosCliente.numero == undefined ||
        dadosCliente.uf == '' || dadosCliente.uf == undefined 
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        //verifica se o email inserido no cadastro ja e cadastrado
        const emailExistenteCliente = await clienteDAO.verificarEmailExistenteCliente(dadosCliente.email);

        if (emailExistenteCliente) {
            return message.ERROR_EMAIL_ALREADY_EXISTS;
        }

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.procedureInsertCadastroCliente(dadosCliente)

        if (resultadoDados) {

            let novoCliente = await clienteDAO.selectLastId()

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            dadosJSON.cliente = novoCliente[0]

            return dadosJSON

        } else {

            return message.ERROR_INTERNAL_SERVER

        }

    }

}


//funcao para atualizar dados de um cliente
const atualizarCadastroCliente = async (dadosCliente,idCliente) => { 

    if (
        dadosCliente.id_cliente == '' || dadosCliente.id_cliente == undefined ||
        dadosCliente.nome == '' || dadosCliente.nome == undefined ||
        dadosCliente.email == '' || dadosCliente.email == undefined ||
        dadosCliente.senha == '' || dadosCliente.senha == undefined ||
        dadosCliente.cpf == '' || dadosCliente.cpf == undefined ||
        dadosCliente.telefone == '' || dadosCliente.telefone == undefined ||
        dadosCliente.cep == '' || dadosCliente.cep == undefined ||
        dadosCliente.logradouro == '' || dadosCliente.logradouro == undefined ||
        dadosCliente.bairro == '' || dadosCliente.bairro == undefined ||
        dadosCliente.localidade == '' || dadosCliente.localidade == undefined ||
        dadosCliente.numero == '' || dadosCliente.numero == undefined ||
        dadosCliente.uf == '' || dadosCliente.uf == undefined 
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {

        let dadosJSON = {}
    
        const resultadoDados = await proceduresDAO.procedureUpdateDadosCliente(dadosCliente,idCliente);

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_UPDATED_ITEM.status;
            dadosJSON.message = message.SUCESS_UPDATED_ITEM.message;
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}


//funcao pra cadastrar um produto no cardapio
const inserirProdutoNoCardapio = async (dadosProduto) => {

    if (
        dadosProduto.nome == '' || dadosProduto.nome == undefined ||
        dadosProduto.descricao == '' || dadosProduto.descricao == undefined ||
        dadosProduto.imagem == '' || dadosProduto.imagem == undefined ||
        dadosProduto.preco == '' || dadosProduto.preco == undefined ||
        dadosProduto.status_produto == '' || dadosProduto.status_produto == undefined || dadosProduto.status_produto == false || dadosProduto.status_produto == null ||
        dadosProduto.categoria_produto == '' || dadosProduto.categoria_produto == undefined || dadosProduto.categoria_produto == false || dadosProduto.categoria_produto == null ||
        dadosProduto.nome_fantasia == '' || dadosProduto.nome_fantasia == undefined || dadosProduto.nome_fantasia == false || dadosProduto.nome_fantasia == null
    ) {
        return message.ERROR_REQUIRED_FIELDS;

    } else {

        // Verifica se o status_produto, categoria_produto e nome_fantasia existem no banco de dados
        const statusProdutoExiste = await statusProdutoDAO.verificarStatusProdutoExistente(dadosProduto.status_produto);
        const categoriaProdutoExiste = await categoriaProdutoDAO.verificarCategoriaProdutoExistente(dadosProduto.categoria_produto);
        const nomeFantasiaRestauranteExiste = await restauranteDAO.verificarNomeFantasiaRestauranteExistente(dadosProduto.nome_fantasia);

        if (!statusProdutoExiste) {
            return message.ERROR_STATUS_PRODUCT_NOT_FOUND;
        }

        if (!categoriaProdutoExiste) {
            return message.ERROR_CATEGORY_PRODUCT_NOT_FOUND;
        }

        if (!nomeFantasiaRestauranteExiste) {
            return message.ERROR_RESTAURANT_NOT_FOUND;
        }

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.procedureInsertProduto(dadosProduto)

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}

//funcao para atualizar um produto no cardapio
const atualizarProdutoNoCardapio = async (dadosProduto) => {     
    if (
        dadosProduto.id === undefined || dadosProduto.id === null || dadosProduto.id === '' ||
        dadosProduto.nome === '' || dadosProduto.nome === undefined ||
        dadosProduto.descricao === '' || dadosProduto.descricao === undefined ||
        dadosProduto.imagem === '' || dadosProduto.imagem === undefined ||
        dadosProduto.preco === '' || dadosProduto.preco === undefined ||
        dadosProduto.status_produto === '' || dadosProduto.status_produto === undefined || dadosProduto.status_produto === false || dadosProduto.status_produto === null ||
        dadosProduto.categoria_produto === '' || dadosProduto.categoria_produto === undefined || dadosProduto.categoria_produto === false || dadosProduto.categoria_produto === null ||
        dadosProduto.nome_fantasia === '' || dadosProduto.nome_fantasia === undefined || dadosProduto.nome_fantasia === false || dadosProduto.nome_fantasia === null
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {
        // Verifica se o status_produto, categoria_produto e nome_fantasia existem no banco de dados
        const statusProdutoExiste = await statusProdutoDAO.verificarStatusProdutoExistente(dadosProduto.status_produto);
        const categoriaProdutoExiste = await categoriaProdutoDAO.verificarCategoriaProdutoExistente(dadosProduto.categoria_produto);
        const nomeFantasiaRestauranteExiste = await restauranteDAO.verificarNomeFantasiaRestauranteExistente(dadosProduto.nome_fantasia);

        if (!statusProdutoExiste) {
            return message.ERROR_STATUS_PRODUCT_NOT_FOUND;
        }

        if (!categoriaProdutoExiste) {
            return message.ERROR_CATEGORY_PRODUCT_NOT_FOUND;
        }

        if (!nomeFantasiaRestauranteExiste) {
            return message.ERROR_RESTAURANT_NOT_FOUND;
        }

        let dadosJSON = {}

        const resultadoDados = await proceduresDAO.procedureUpdateProduto(dadosProduto);

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_UPDATED_ITEM.status;
            dadosJSON.message = message.SUCESS_UPDATED_ITEM.message;
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}


//funcao pro restaurante aceitar formas de pagamentos 
const inserirFormaPagamentoRestaurante = async (dados) => {

    if (
        dados.restaurante_id == '' || dados.restaurante_id == undefined ||
        dados.forma_pagamento_id == '' || dados.forma_pagamento_id == undefined 
    ) {
        
        return message.ERROR_REQUIRED_FIELDS;

    } else {

        // Verifica se a forma de pagamento existe no banco de dados
        const formaPagamentoExistente = await formaPagamentoDAO.verificarFormaPagamentoExistente(dados.forma_pagamento_id);

        if (!formaPagamentoExistente) {
            return message.ERROR_FORMA_PAGAMENTO_NOT_FOUND;
        }

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.procedureInsertRestauranteFormaPagamento(dados)

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}


//funcao pra restaurante cadastrar suas areas de entrega
const restauranteInserirSuasAreasDeEntrega = async (dados) => {

    if (
        dados.restaurante_id == '' || dados.restaurante_id == undefined ||
        dados.km == '' || dados.km == undefined ||
        dados.valor_entrega == '' || dados.valor_entrega == undefined ||
        dados.tempo_entrega == '' || dados.tempo_entrega == undefined ||
        dados.raio_entrega == '' || dados.raio_entrega == undefined 
      
        ) {
            return message.ERROR_REQUIRED_FIELDS
    
        } else {

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.procedureInsertRestauranteAreaEntrega(dados)

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}

//funcao para o restaurante atualizar suas areas de entrega
const restauranteAtualizarSuasAreasDeEntrega = async (dados) => { 

    if (
        dados.restaurante_id == '' || dados.restaurante_id == undefined ||
        dados.area_entrega_id == '' || dados.area_entrega_id == undefined ||
        dados.novo_km == '' || dados.novo_km == undefined ||
        dados.novo_valor_entrega == '' || dados.novo_valor_entrega == undefined ||
        dados.novo_tempo_entrega == '' || dados.novo_tempo_entrega == undefined ||
        dados.novo_raio_entrega == '' || dados.novo_raio_entrega == undefined 
      
        ) {

        return message.ERROR_REQUIRED_FIELDS;
    } else {

        let dadosJSON = {}

        const resultadoDados = await proceduresDAO.procedureUpdateRestauranteAreaEntrega(dados);

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_UPDATED_ITEM.status;
            dadosJSON.message = message.SUCESS_UPDATED_ITEM.message;
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}


const clienteInserirPedido = async function (dadosProcedures) {

    if (
        dadosProcedures.id_status_pedido == '' || dadosProcedures.id_status_pedido == undefined ||
        dadosProcedures.id_restaurante_forma_pagamento == '' || dadosProcedures.id_restaurante_forma_pagamento == undefined ||
        dadosProcedures.id_restaurante_frete_area_entrega == '' || dadosProcedures.id_restaurante_frete_area_entrega == undefined ||
        dadosProcedures.id_cliente == '' || dadosProcedures.id_cliente == undefined ||
        dadosProcedures.id_restaurante == '' || dadosProcedures.id_restaurante == undefined ||
        dadosProcedures.produto_id1 == '' || dadosProcedures.produto_id1 == undefined 
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await proceduresDAO.procedureClienteInsertPedido(dadosProcedures)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoPedido = await proceduresDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.novo_pedido = novoPedido

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}


//funcao pra restaurante cadastrar seus dias e horarios de funcionamento
const restauranteInserirSeusDiasHorariosFuncionamento = async (dados) => {

    if (
        dados.restaurante_id == '' || dados.restaurante_id == undefined ||
        dados.horario_inicio == '' || dados.horario_inicio == undefined ||
        dados.horario_final == '' || dados.horario_final == undefined ||
        dados.dias_semana == '' || dados.dias_semana == undefined 
      
        ) {
            return message.ERROR_REQUIRED_FIELDS
    
        } else {

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.procedureRestauranteInsertDiasHorariosFuncionamento(dados)

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}


//funcao para o restaurante atualizar seu horario de funcionamento
const restauranteAtualizarHorarioFuncionamento = async (dados) => {
    if (
        dados.restaurante_id == '' || dados.restaurante_id == undefined ||
        dados.dia_semana_id == '' || dados.dia_semana_id == undefined ||
        dados.horario_inicio == '' || dados.horario_inicio == undefined ||
        dados.horario_final == '' || dados.horario_final == undefined 
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {
        // Verifica se o restaurante_id e dia_semana_idexiste no banco de dados 
        const restauranteExistente = await restauranteDAO.selectRestauranteByID(dados.restaurante_id);
        const diaSemanaExistente = await diaSemanaDAO.selectDiaSemanaByID(dados.dia_semana_id);

        if (!restauranteExistente) {
            return message.ERROR_INVALID_ID_RESTAURANTE;
        }
        if (!diaSemanaExistente) {
            return message.ERROR_INVALID_ID_DIA_SEMANA;
        }
        let dadosJSON = {};

        const resultadoDados = await proceduresDAO.procedureUpdateHorariosFuncionamentoDoRestaurante(dados);

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_UPDATED_ITEM.status;
            dadosJSON.message = message.SUCESS_UPDATED_ITEM.message;
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}

//funcao para o cliente avaliar um restaurante
const clienteAvaliarRestaurante = async (dados) => {

    if (
        dados.cliente_id == '' || dados.cliente_id == undefined ||
        dados.restaurante_id == '' || dados.restaurante_id == undefined ||
        dados.quantidade_estrela == '' || dados.quantidade_estrela == undefined ||
        dados.descricao == '' || dados.descricao == undefined ||
        dados.data_avaliacao == '' || dados.data_avaliacao == undefined ||
        dados.recomendacao_id == '' || dados.recomendacao_id == undefined
      
        ) {
            return message.ERROR_REQUIRED_FIELDS
    
        } else {

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.procedureClienteAvaliarRestaurante(dados)

        if (resultadoDados) {
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            return dadosJSON;
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}


module.exports = {
    inserirCadastroProcedureRestaurante,
    inserirCadastroCliente,
    inserirProdutoNoCardapio,
    atualizarProdutoNoCardapio,
    inserirFormaPagamentoRestaurante,
    restauranteInserirSuasAreasDeEntrega,
    restauranteAtualizarSuasAreasDeEntrega,
    atualizarCadastroRestaurante,
    clienteInserirPedido,
    restauranteInserirSeusDiasHorariosFuncionamento,
    restauranteAtualizarHorarioFuncionamento,
    clienteAvaliarRestaurante,
    atualizarCadastroCliente

}