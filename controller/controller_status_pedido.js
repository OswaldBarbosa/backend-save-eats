/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do status_pedido
 * (GET, POST, PUT, DELETE)
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var status_pedidoDAO = require('../model/DAO/status_pedidoDAO.js')

const { request } = require('express')

const inserirStatusPedido = async function (dadosStatusPedido) {

    if (
        dadosStatusPedido.status_pedido == '' || dadosStatusPedido.status_pedido == undefined || dadosStatusPedido.status_pedido.length > 45 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await status_pedidoDAO.insertStatusPedido(dadosStatusPedido)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoStatus = await status_pedidoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.status_pedido = novoStatus

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarStatusPedido = async function (idStatusPedido) {
    let statusId = await status_pedidoDAO.selectStatusPedidoByID(idStatusPedido);

    if (statusId) {
        if (idStatusPedido == '' || idStatusPedido == undefined || isNaN(idStatusPedido)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await status_pedidoDAO.deleteStatusPedido(idStatusPedido)

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

const atualizarStatusPedido = async function (dadosStatusPedido, idStatusPedido) {

    if (
        dadosStatusPedido.status_pedido == '' || dadosStatusPedido.status_pedido == undefined || dadosStatusPedido.status_pedido.length > 45 

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idStatusPedido == '' || idStatusPedido == undefined || idStatusPedido == isNaN(idStatusPedido)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosStatusPedido.id = idStatusPedido;

        let statusId = await status_pedidoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await status_pedidoDAO.updateStatusPedido(dadosStatusPedido);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.status_pedido = dadosStatusPedido
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getStatusPedido = async function () {
    let dadosJSON = {};


    let dadosStatusPedido = await status_pedidoDAO.selectAllStatusPedido();

    if (dadosStatusPedido) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosStatusPedido.length;
        dadosJSON.status_pedido = dadosStatusPedido
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getStatusPedidoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await status_pedidoDAO.selectStatusPedidoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.status_pedido = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirStatusPedido,
    atualizarStatusPedido,
    deletarStatusPedido,
    getStatusPedido,
    getStatusPedidoPorID
}