/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tbl_restaurante_forma_pagamento
 * (GET, POST, PUT, DELETE)
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var restauranteFormaPagamentoDAO = require('../model/DAO/restaurante_forma_pagamentoDAO.js')


const { request } = require('express')

const inserirRestauranteFormaPagamento = async function (dados) {

    if ( dados.id_restaurante == ''|| dados.id_restaurante == undefined || isNaN(dados.id_restaurante) ||
         dados.id_forma_pagamento == ''|| dados.id_forma_pagamento == undefined || isNaN(dados.id_forma_pagamento)
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await restauranteFormaPagamentoDAO.insertRestauranteFormaPagamento(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRestauranteFormaPagamento = await restauranteFormaPagamentoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.restaurante_forma_pagamento = novoRestauranteFormaPagamento

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarRestauranteFormaPagamento = async function (dados, idRestauranteFormaPagamento) {

    if ( dados.id_restaurante == ''|| dados.id_restaurante == undefined || isNaN(dados.id_restaurante) ||
         dados.id_forma_pagamento == ''|| dados.id_forma_pagamento == undefined || isNaN(dados.id_forma_pagamento)
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idRestauranteFormaPagamento == '' || idRestauranteFormaPagamento == undefined || idRestauranteFormaPagamento == isNaN(idRestauranteFormaPagamento)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idRestauranteFormaPagamento;

        let statusId = await restauranteFormaPagamentoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model
            let resultDados = await restauranteFormaPagamentoDAO.updateRestauranteFormaPagamento(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.restaurante_forma_pagamento = dados
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarRestauranteFormaPagamento = async function (idRestauranteFormaPagamento) {
    let statusId = await restauranteFormaPagamentoDAO.selectRestauranteFormaPagamentoByID(idRestauranteFormaPagamento);

    if (statusId) {
        if (idRestauranteFormaPagamento == '' || idRestauranteFormaPagamento == undefined || isNaN(idRestauranteFormaPagamento)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await restauranteFormaPagamentoDAO.deleteRestauranteFormaPagamento(idRestauranteFormaPagamento)

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


const getRestauranteFormaPagamento = async function () {

    let dadosJSON = {};

    let dados = await restauranteFormaPagamentoDAO.selectAllRestauranteFormaPagamento();

    if (dados) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dados.length;
        dadosJSON.restaurante_forma_pagamento = dados
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getRestauranteFormaPagamentoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await restauranteFormaPagamentoDAO.selectRestauranteFormaPagamentoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.restaurante_forma_pagamento = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


module.exports = {
    inserirRestauranteFormaPagamento,
    atualizarRestauranteFormaPagamento,
    getRestauranteFormaPagamento,
    getRestauranteFormaPagamentoPorID,
    deletarRestauranteFormaPagamento
}