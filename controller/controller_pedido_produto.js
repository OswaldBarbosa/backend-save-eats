/***************************************************************************************************************************************************
* Objetivo: Responsavel pela regra de negocio referente ao CRUD de pedido_produto
* (GET, POST, PUT, DELETE)
* Data: 11/09/2023
* Autor: Caroline Portela
* Versão: 1.0
***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var pedidoProdutoDAO = require('../model/DAO/pedido_produtoDAO.js')

const { request } = require('express')

const inserirPedidoProduto = async function (dados) {

    if (
        dados.id_pedido == '' || dados.id_pedido == undefined ||
        dados.id_produto == '' || dados.id_produto == undefined 

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await pedidoProdutoDAO.insertPedidoProduto(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistro = await pedidoProdutoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.pedido_produtos = novoRegistro

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarPedidoProduto = async function (dados, idPedidoProduto) {

    if (
        dados.id_pedido == '' || dados.id_pedido == undefined ||
        dados.id_produto == '' || dados.id_produto == undefined 

    ) {
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idPedidoProduto == '' || idPedidoProduto == undefined || idPedidoProduto == isNaN(idPedidoProduto)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idPedidoProduto;

        let statusId = await pedidoProdutoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await pedidoProdutoDAO.updatePedidoProduto(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.pedido_produto = dados
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarPedidoProduto = async function (idPedidoProduto) {
    let statusId = await pedidoProdutoDAO.selectPedidoProdutoByID(idPedidoProduto);

    if (statusId) {
        if (idPedidoProduto == '' || idPedidoProduto == undefined || isNaN(idPedidoProduto)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await pedidoProdutoDAO.deletePedidoProduto(idPedidoProduto)

            if (resultDados) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getPedidoProduto = async function () {

    let dadosJSON = {};

    let dadosPedidoProduto = await pedidoProdutoDAO.selectAllPedidoProduto();

    if (dadosPedidoProduto) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosPedidoProduto.length;
        dadosJSON.pedido_produto = dadosPedidoProduto
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getPedidoProdutoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await pedidoProdutoDAO.selectPedidoProdutoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.pedido_produto = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirPedidoProduto,
    atualizarPedidoProduto,
    deletarPedidoProduto,
    getPedidoProduto,
    getPedidoProdutoPorID
}
