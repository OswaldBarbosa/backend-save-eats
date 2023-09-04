/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do horario de funcionamento
 * (GET, POST, PUT, DELETE)
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var horarioFuncionamentoDAO = require('../model/DAO/horario_funcionamentoDAO.js')

const { request } = require('express')

const inserirHorarioFuncionamento = async function (dadosHorarioFuncionamento) {

    if (dadosHorarioFuncionamento.dia == '' || dadosHorarioFuncionamento.dia == undefined ||
        dadosHorarioFuncionamento.horario_inicio == '' || dadosHorarioFuncionamento.horario_inicio == undefined ||
        dadosHorarioFuncionamento.horario_final == '' || dadosHorarioFuncionamento.horario_final == undefined 
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await horarioFuncionamentoDAO.insertHorarioFuncionamento(dadosHorarioFuncionamento)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoHorario = await horarioFuncionamentoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.horario_funcionamento = novoHorario

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarHorarioFuncionamento = async function (idHorarioFuncionamento) {
    let statusId = await horarioFuncionamentoDAO.selectHorarioFuncionamentoByID(idHorarioFuncionamento);

    if (statusId) {
        if (idHorarioFuncionamento == '' || idHorarioFuncionamento == undefined || isNaN(idHorarioFuncionamento)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDados = await horarioFuncionamentoDAO.deleteHorarioFuncionamento(idHorarioFuncionamento)

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

const atualizarHorarioFuncionamento = async function (dadosHorarioFuncionamento, idHorarioFuncionamento) {

    if (dadosHorarioFuncionamento.dia == '' || dadosHorarioFuncionamento.dia == undefined ||
        dadosHorarioFuncionamento.horario_inicio == '' || dadosHorarioFuncionamento.horario_inicio == undefined ||
        dadosHorarioFuncionamento.horario_final == '' || dadosHorarioFuncionamento.horario_final == undefined 
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idHorarioFuncionamento == '' || idHorarioFuncionamento == undefined || idHorarioFuncionamento == isNaN(idHorarioFuncionamento)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosHorarioFuncionamento.id = idHorarioFuncionamento;

        let statusId = await horarioFuncionamentoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await horarioFuncionamentoDAO.updateHorarioFuncionamento(dadosHorarioFuncionamento);

            if (resultDados) {

                let dadosHorarioFuncionamentoJSON = {}

                dadosHorarioFuncionamentoJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosHorarioFuncionamentoJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosHorarioFuncionamentoJSON.horario_funcionamento = dadosHorarioFuncionamento
                return dadosHorarioFuncionamentoJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getHorarioFuncionamento = async function () {
    let dadosHorarioFuncionamentoJSON = {};


    let dadosHorario = await horarioFuncionamentoDAO.selectAllHorarioFuncionamento();

    if (dadosHorario) {

        dadosHorarioFuncionamentoJSON.status = message.SUCESS_REQUEST.status
        dadosHorarioFuncionamentoJSON.message = message.SUCESS_REQUEST.message
        dadosHorarioFuncionamentoJSON.quantidade = dadosHorario.length;
        dadosHorarioFuncionamentoJSON.horario_funcionamento =  dadosHorario
        return  dadosHorarioFuncionamentoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getHorarioFuncionamentoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await horarioFuncionamentoDAO.selectHorarioFuncionamentoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.horario_funcionamento = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirHorarioFuncionamento,
    deletarHorarioFuncionamento,
    atualizarHorarioFuncionamento,
    getHorarioFuncionamento,
    getHorarioFuncionamentoPorID
}