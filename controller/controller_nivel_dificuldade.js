/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de nivel_dificuldade
 * Data: 18/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var nivelDificuldadeDAO = require('../model/DAO/nivel_de_dificuldadeDAO.js')

const { request } = require('express')


const inserirNivelDificuldade = async function (dadosNivelDificuldade) {

    if ( dadosNivelDificuldade.nivel_dificuldade == '' || dadosNivelDificuldade.nivel_dificuldade == undefined 
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await nivelDificuldadeDAO.insertNivelDificuldade(dadosNivelDificuldade)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaNivel = await nivelDificuldadeDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.nivel_dificuldade = novaNivel

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarNivelDificuldade = async function (dadosNivelDificuldade, idNivelDificuldade) {

    if ( dadosNivelDificuldade.nivel_dificuldade == '' || dadosNivelDificuldade.nivel_dificuldade == undefined 
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idNivelDificuldade == '' || idNivelDificuldade == undefined || idNivelDificuldade == isNaN(idNivelDificuldade)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosNivelDificuldade.id = idNivelDificuldade;

        let statusId = await nivelDificuldadeDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await nivelDificuldadeDAO.updateNivelDificuldade(dadosNivelDificuldade);

            if (resultDados) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.nivel_dificuldade = dadosNivelDificuldade
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getNivelDificuldade = async function () {
    let dadosNivelDificuldadeJSON = {};


    let dadosNivelDificuldade = await nivelDificuldadeDAO.selectAllTNivelDificuldade();

    if (dadosNivelDificuldade) {

        dadosNivelDificuldadeJSON.status = message.SUCESS_REQUEST.status
        dadosNivelDificuldadeJSON.message = message.SUCESS_REQUEST.message
        dadosNivelDificuldadeJSON.quantidade = dadosNivelDificuldade.length;
        dadosNivelDificuldadeJSON.nivel_dificuldade =  dadosNivelDificuldade
        return  dadosNivelDificuldadeJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const deletarNivelDificuldade = async function (idNivelDificuldade) {
    let statusId = await nivelDificuldadeDAO.selectNivelDificuldadeById(idNivelDificuldade);

    if (statusId) {

        if (idNivelDificuldade == '' || idNivelDificuldade == undefined || isNaN(idNivelDificuldade)) {
            return message.ERROR_INVALID_ID; 

        } else {
            let resultDados = await nivelDificuldadeDAO.deleteNivelDificuldade(idNivelDificuldade)

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


module.exports = {
    inserirNivelDificuldade,
    atualizarNivelDificuldade,
    getNivelDificuldade,
    deletarNivelDificuldade
}