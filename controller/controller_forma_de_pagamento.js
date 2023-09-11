/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tbl_forma_pagamento
 * (GET, POST, PUT, DELETE)
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var formaPagamentoDAO = require('../model/DAO/forma_de_pagamentoDAO.js')

const { request } = require('express')

const inserirFormaPagamento = async function (dados) {

    if (dados.foto_bandeira == '' || dados.foto_bandeira == undefined || dados.foto_bandeira.length > 300 ||
        dados.nome_forma_pagamento == '' || dados.nome_forma_pagamento == undefined || dados.nome_forma_pagamento.length > 45 ||
        dados.tipo_forma_pagamento == '' || dados.tipo_forma_pagamento == undefined  || dados.tipo_forma_pagamento.length > 45 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await formaPagamentoDAO.insertFormaPagamento(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaFormaPagamento = await formaPagamentoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.forma_pagamento = novaFormaPagamento

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarFormaPagamento = async function (idFormaPagamento) {
    let statusId = await formaPagamentoDAO.selectFormaPagamentoByID(idFormaPagamento);

    if (statusId) {
        if (idFormaPagamento == '' || idFormaPagamento == undefined || isNaN(idFormaPagamento)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await formaPagamentoDAO.deleteFormaPagamento(idFormaPagamento)

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

const atualizarFormaPagamento = async function (dados, idFormaPagamento) {

    if (dados.foto_bandeira == '' || dados.foto_bandeira == undefined || dados.foto_bandeira.length > 300 ||
        dados.nome_forma_pagamento == '' || dados.nome_forma_pagamento == undefined || dados.nome_forma_pagamento.length > 45 ||
        dados.tipo_forma_pagamento == '' || dados.tipo_forma_pagamento == undefined  || dados.tipo_forma_pagamento.length > 45 

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idFormaPagamento == '' || idFormaPagamento == undefined || idFormaPagamento == isNaN(idFormaPagamento)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idFormaPagamento;

        let statusId = await formaPagamentoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await formaPagamentoDAO.updateFormaPagamento(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.forma_de_pagamento = dados
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getFormaPagamento = async function () {
    let dadosFormaPagamentoJSON = {};


    let dados = await formaPagamentoDAO.selectAllFormaPagamento();

    if (dados) {

        dadosFormaPagamentoJSON.status = message.SUCESS_REQUEST.status
        dadosFormaPagamentoJSON.message = message.SUCESS_REQUEST.message
        dadosFormaPagamentoJSON.quantidade = dados.length;
        dadosFormaPagamentoJSON.formas_de_pagamento = dados
        return dadosFormaPagamentoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getFormaPagamentoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await formaPagamentoDAO.selectFormaPagamentoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.forma_de_pagamento = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirFormaPagamento,
    deletarFormaPagamento,
    atualizarFormaPagamento,
    getFormaPagamento,
    getFormaPagamentoPorID
}