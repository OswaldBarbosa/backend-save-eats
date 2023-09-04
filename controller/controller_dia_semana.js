/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela dia_semana
 * (GET, POST, PUT, DELETE)
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var diaSemanaDAO = require('../model/DAO/dia_semanaDAO.js')

const { request } = require('express')

const inserirDiaSemana = async function (dadosDiaSemana) {

    if (dadosDiaSemana.dia_semana == '' ||dadosDiaSemana.dia_semana == undefined ||dadosDiaSemana.dia_semana.length > 45
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await diaSemanaDAO.insertDiaSemana(dadosDiaSemana)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoDia = await diaSemanaDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.dias_da_semana = novoDia

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarDiaSemana = async function (idDiaSemana) {
    let statusId = await diaSemanaDAO.selectDiaSemanaByID(idDiaSemana);

    if (statusId) {
        if (idDiaSemana == '' || idDiaSemana == undefined || isNaN(idDiaSemana)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDados = await diaSemanaDAO.deleteDiaSemana(idDiaSemana)

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

const atualizarDiaSemana = async function (dadosDiaSemana, idDiaSemana) {

    if (dadosDiaSemana.dia_semana == '' || dadosDiaSemana.dia_semana == undefined || dadosDiaSemana.dia_semana.length > 45
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idDiaSemana == '' || idDiaSemana == undefined || idDiaSemana == isNaN(idDiaSemana)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosDiaSemana.id = idDiaSemana;

        let statusId = await diaSemanaDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await diaSemanaDAO.updateDiaSemana(dadosDiaSemana);

            if (resultDados) {

                let dadosDiaSemanaJSON = {}

                dadosDiaSemanaJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosDiaSemanaJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosDiaSemanaJSON.dia_semana = dadosDiaSemana
                return dadosDiaSemanaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getDiaSemana = async function () {
    let dadosDiaSemanaJSON = {};


    let dadosDiaSemana = await diaSemanaDAO.selectAllRegistroDiaSemana();

    if (dadosDiaSemana) {

        dadosDiaSemanaJSON.status = message.SUCESS_REQUEST.status
        dadosDiaSemanaJSON.message = message.SUCESS_REQUEST.message
        dadosDiaSemanaJSON.quantidade = dadosDiaSemana.length;
        dadosDiaSemanaJSON.dia_semana =  dadosDiaSemana
        return  dadosDiaSemanaJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getDiaSemanaPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await diaSemanaDAO.selectDiaSemanaByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.dia_semana = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirDiaSemana,
    atualizarDiaSemana,
    deletarDiaSemana,
    getDiaSemana,
    getDiaSemanaPorID
}