/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de tempo de preparo 
 * Data: 11/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var tempoPreparoDAO = require('../model/DAO/tempo_preparoDAO.js')

const { request } = require('express')

const inserirTempoPreparo = async function (dadosTempoPreparo) {

    if (dadosTempoPreparo.tempo_preparo == '' || dadosTempoPreparo.tempo_preparo == undefined 
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await tempoPreparoDAO.insertTempoPreparo(dadosTempoPreparo)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaTempo = await tempoPreparoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.tempo_preparo = novaTempo

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarTempoPreparo = async function (dadosTempoPreparo, idTempoPreparo) {

    if (dadosTempoPreparo.tempo_preparo == '' || dadosTempoPreparo.tempo_preparo == undefined 
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idTempoPreparo == '' || idTempoPreparo == undefined || idTempoPreparo == isNaN(idTempoPreparo)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosTempoPreparo.id = idTempoPreparo;

        let statusId = await tempoPreparoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await tempoPreparoDAO.updateTempoPreparo(dadosTempoPreparo);

            if (resultDados) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.tempo_preparo = dadosTempoPreparo
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const deletarTempoPreparo = async function (idTempoPreparo) {
    let statusId = await tempoPreparoDAO.selectTempoPreparoById(idTempoPreparo);

    if (statusId) {
        if (idTempoPreparo == '' || idTempoPreparo == undefined || isNaN(idTempoPreparo)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await tempoPreparoDAO.deleteTempoPreparo(idTempoPreparo)

            if ( resultDados) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTempoPreparo = async function () {
    let dadosTempoPreparoJSON = {};


    let dadosTempoPreparo = await tempoPreparoDAO.selectAllTempoPreparo();

    if (dadosTempoPreparo) {

        dadosTempoPreparoJSON.status = message.SUCESS_REQUEST.status
        dadosTempoPreparoJSON.message = message.SUCESS_REQUEST.message
        dadosTempoPreparoJSON.quantidade = dadosTempoPreparo.length;
        dadosTempoPreparoJSON.tempo_preparo =  dadosTempoPreparo
        return  dadosTempoPreparoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTempoPreparoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await tempoPreparoDAO.selectTempoPreparoById(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.tempo_preparo = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}



module.exports = {
    inserirTempoPreparo,
    atualizarTempoPreparo,
    getTempoPreparo,
    deletarTempoPreparo,
    getTempoPreparoPorID
}