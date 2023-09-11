/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD das Dicas
 * Data: 07/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var dicasDAO = require('../model/DAO/dicasDAO.js')

const { request } = require('express')

const inserirDicas = async function (dadosDicas) {

    if (
        dadosDicas.nome == '' ||dadosDicas.nome == undefined || dadosDicas.nome.length > 100 ||
        dadosDicas.foto == undefined || dadosDicas.foto.length > 300 ||
        dadosDicas.descricao == '' ||dadosDicas.descricao == undefined 
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await dicasDAO.insertDicas(dadosDicas)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaDica = await dicasDAO.selectLastId()

            let dadosDicasJSON = {}
            dadosDicasJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosDicasJSON.dica = novaDica

            return dadosDicasJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarDicas = async function (idDicas) {
    let statusId = await dicasDAO.selectDicasByID(idDicas);

    if (statusId) {

        if (idDicas == '' || idDicas == undefined || isNaN(idDicas)) {
            return message.ERROR_INVALID_ID; 

        } else {
            let resultDados = await dicasDAO.deleteDicas(idDicas)

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

const atualizarDicas = async function (dadosDicas, idDicas) {

    if (
        dadosDicas.nome == '' ||dadosDicas.nome == undefined || dadosDicas.nome.length > 100 ||
        dadosDicas.foto == undefined || dadosDicas.foto.length > 300 ||
        dadosDicas.descricao == '' ||dadosDicas.descricao == undefined 
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idDicas == '' || idDicas == undefined || idDicas == isNaN(idDicas)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosDicas.id = idDicas;

        let statusId = await dicasDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await dicasDAO.updateDicas(dadosDicas);

            if (resultDados) {

                let dadosDicasJSON = {}

                dadosDicasJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosDicasJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosDicasJSON.dica = dadosDicas
                return dadosDicasJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getDicas = async function () {
    let dadosDicassJSON = {};


    let dadosDicas = await dicasDAO.selectAllDicas();

    if (dadosDicas) {

        dadosDicassJSON.status = message.SUCESS_REQUEST.status
        dadosDicassJSON.message = message.SUCESS_REQUEST.message
        dadosDicassJSON.quantidade = dadosDicas.length;
        dadosDicassJSON.dica =  dadosDicas
        return  dadosDicassJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getDicasPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await dicasDAO.selectDicasByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.dica = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirDicas,
    deletarDicas,
    atualizarDicas,
    getDicas,
    getDicasPorID
}