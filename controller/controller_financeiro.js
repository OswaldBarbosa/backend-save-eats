/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD financeiro
 * (GET, POST, PUT, DELETE)
 * Data: 06/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var financeiroDAO = require('../model/DAO/financeiroDAO.js')


const { request } = require('express')

const inserirFinanceiro = async function (dadosFinaceiro) {

    if (dadosFinaceiro.valor_diario == '' || dadosFinaceiro.valor_diario == undefined  ||
        dadosFinaceiro.data_financeiro == '' || dadosFinaceiro.data_financeiro == undefined  ||
        dadosFinaceiro.id_restaurante == ''|| dadosFinaceiro.id_restaurante == undefined

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await financeiroDAO.insertFinanceiro(dadosFinaceiro)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistroFinanceiro = await financeiroDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.novo_registro_financeiro = novoRegistroFinanceiro

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarFinanceiro = async function (dadosFinanceiro, idFinanceiro) {

    if (
        dadosFinanceiro.valor_diario == '' || dadosFinanceiro.valor_diario == undefined  ||
        dadosFinanceiro.data_financeiro == '' || dadosFinanceiro.data_financeiro == undefined  ||
        dadosFinanceiro.id_restaurante == ''|| dadosFinanceiro.id_restaurante == undefined

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idFinanceiro == '' || idFinanceiro == undefined || idFinanceiro == isNaN(idFinanceiro)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosFinanceiro.id = idFinanceiro;

        let statusId = await financeiroDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model
            let resultDados = await financeiroDAO.updateFinanceiro(dadosFinanceiro);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.financeiro = dadosFinanceiro
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const deletarFinanceiro = async function (idFinanceiro) {
    let statusId = await financeiroDAO.selectFinanceiroByID(idFinanceiro);

    if (statusId) {
        if (idFinanceiro == '' || idFinanceiro == undefined || isNaN(idFinanceiro)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await financeiroDAO.deleteFinanceiro(idFinanceiro)

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

const getFinanceiro = async function () {

    let dadosJSON = {};

    let dadosFinanceiro = await financeiroDAO.selectAllFinanceiro();

    if (dadosFinanceiro) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosFinanceiro.length;
        dadosJSON.financeiro = dadosFinanceiro
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getFinanceiroPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await financeiroDAO.selectFinanceiroByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.financeiro_do_restaurante = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


module.exports = {
    inserirFinanceiro,
    deletarFinanceiro,
    getFinanceiro,
    getFinanceiroPorID,
    atualizarFinanceiro
}