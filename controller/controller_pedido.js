/***************************************************************************************************************************************************
* Objetivo: Responsavel pela regra de negocio referente ao CRUD do pedido
* (GET, POST, PUT, DELETE)
* Data: 07/09/2023
* Autor: Caroline Portela
* Versão: 1.0
***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var pedidoDAO = require('../model/DAO/pedidoDAO.js')

const { request } = require('express')

const inserirPedido = async function (dadosPedido) {

    if (dadosPedido.numero_pedido == '' || dadosPedido.numero_pedido == undefined || dadosPedido.numero_pedido.length > 45 ||
        dadosPedido.horario == '' || dadosPedido.horario == undefined ||
        dadosPedido.data_pedido == '' || dadosPedido.data_pedido == undefined ||
        dadosPedido.previsao_entrega == '' || dadosPedido.previsao_entrega == undefined ||
        dadosPedido.valor_total == '' || dadosPedido.valor_total == undefined ||
        dadosPedido.id_status_pedido == '' || dadosPedido.id_status_pedido == undefined ||
        dadosPedido.id_forma_pagamento == '' || dadosPedido.id_forma_pagamento == undefined ||
        dadosPedido.id_frete_area_entrega == '' || dadosPedido.id_frete_area_entrega == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await pedidoDAO.insertPedido(dadosPedido)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoPedido = await pedidoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.pedidos = novoPedido

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarPedido = async function (dadosPedido, idPedido) {

    if (dadosPedido.numero_pedido == '' || dadosPedido.numero_pedido == undefined || dadosPedido.numero_pedido.length > 45 ||
        dadosPedido.horario == '' || dadosPedido.horario == undefined ||
        dadosPedido.data_pedido == '' || dadosPedido.data_pedido == undefined ||
        dadosPedido.previsao_entrega == '' || dadosPedido.previsao_entrega == undefined ||
        dadosPedido.valor_total == '' || dadosPedido.valor_total == undefined ||
        dadosPedido.id_status_pedido == '' || dadosPedido.id_status_pedido == undefined ||
        dadosPedido.id_forma_pagamento == '' || dadosPedido.id_forma_pagamento == undefined ||
        dadosPedido.id_frete_area_entrega == '' || dadosPedido.id_frete_area_entrega == undefined

    ) {
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idPedido == '' || idPedido == undefined || idPedido == isNaN(idPedido)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosPedido.id = idPedido;

        let statusId = await pedidoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await pedidoDAO.updatePedido(dadosPedido);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.pedido = dadosPedido
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const deletarPedido = async function (idPedido) {
    let statusId = await pedidoDAO.selectPedidoByID(idPedido);

    if (statusId) {
        if (idPedido == '' || idPedido == undefined || isNaN(idPedido)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await pedidoDAO.deletePedido(idPedido)

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

const getPedidos = async function () {

    let dadosPedidoJSON = {};

    let dadosPedido = await pedidoDAO.selectAllPedido();

    if (dadosPedido) {

        dadosPedidoJSON.status = message.SUCESS_REQUEST.status
        dadosPedidoJSON.message = message.SUCESS_REQUEST.message
        dadosPedidoJSON.quantidade = dadosPedido.length;
        dadosPedidoJSON.pedidos = dadosPedido
        return dadosPedidoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getPedidoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await pedidoDAO.selectPedidoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.pedido = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirPedido,
    atualizarPedido,
    deletarPedido,
    getPedidoPorID,
    getPedidos
}