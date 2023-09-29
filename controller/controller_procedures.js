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

//funcao para fazer o cadastro do restaurante 
const inserirCadastroProcedure = async (dadosCadastro) => {

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


//funcao pra fazer cadastro do cliente
const inserirCadastroCliente = async (dadosCliente) => {

    if (
        dadosCliente.nome == '' || dadosCliente.nome == undefined ||
        dadosCliente.email == '' || dadosCliente.email == undefined ||
        dadosCliente.senha == '' || dadosCliente.senha == undefined ||
        dadosCliente.cpf == '' || dadosCliente.cpf == undefined ||
        dadosCliente.telefone == '' || dadosCliente.telefone == undefined ||
        dadosCliente.nome_estado == '' || dadosCliente.nome_estado == undefined ||
        dadosCliente.nome_cidade == '' || dadosCliente.nome_cidade == undefined ||
        dadosCliente.cep == '' || dadosCliente.cep == undefined ||
        dadosCliente.rua == '' || dadosCliente.rua == undefined ||
        dadosCliente.bairro == '' || dadosCliente.bairro == undefined ||
        dadosCliente.numero == '' || dadosCliente.numero == undefined
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

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message

            return dadosJSON

        } else {

            return message.ERROR_INTERNAL_SERVER

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

        // Chame sua função ou método para atualizar o produto no banco de dados
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




module.exports = {
    inserirCadastroProcedure,
    inserirCadastroCliente,
    inserirProdutoNoCardapio,
    atualizarProdutoNoCardapio
}