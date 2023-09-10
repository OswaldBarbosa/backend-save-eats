/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela de recomendacao
 * (GET, POST, PUT, DELETE)
 * Data: 10/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var recomendacaoDAO = require('../model/DAO/recomendacaoDAO.js')

const { request } = require('express')

const inserirRecomendacao = async function (dadosRecomendacao) {

    if (
        dadosRecomendacao.recomendacao == '' || dadosRecomendacao.recomendacao == undefined || dadosRecomendacao.recomendacao.length > 45 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await recomendacaoDAO.insertRecomendacao(dadosRecomendacao)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaRecomendacao = await recomendacaoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.recomendacao = novaRecomendacao

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarRecomendacao = async function (idRecomendacao) {
    let statusId = await recomendacaoDAO.selectRecomendacaoByID(idRecomendacao);

    if (statusId) {
        if (idRecomendacao == '' || idRecomendacao == undefined || isNaN(idRecomendacao)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await recomendacaoDAO.deleteRecomendacao(idRecomendacao)

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

const atualizarRecomendacao = async function (dadosRecomendacao, idRecomendacao) {

    if (
        dadosRecomendacao.recomendacao == '' || dadosRecomendacao.recomendacao == undefined || dadosRecomendacao.recomendacao.length > 45 

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idRecomendacao == '' || idRecomendacao == undefined || idRecomendacao == isNaN(idRecomendacao)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosRecomendacao.id = idRecomendacao;

        let statusId = await recomendacaoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await recomendacaoDAO.updateRecomendacao(dadosRecomendacao);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.recomendacao_atualizada = dadosRecomendacao
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getRecomendacao = async function () {
    let dadosJSON = {};


    let dadosRecomendacao = await recomendacaoDAO.selectAllRecomendacao();

    if (dadosRecomendacao) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosRecomendacao.length;
        dadosJSON.recomendacoes = dadosRecomendacao
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getRecomendacaoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await recomendacaoDAO.selectRecomendacaoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.recomendacao = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirRecomendacao,
    atualizarRecomendacao,
    getRecomendacao,
    getRecomendacaoPorID,
    deletarRecomendacao
}