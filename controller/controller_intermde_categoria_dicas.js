/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela intermediária entre dicas e categoria
 * Data: 07/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var intermedCategoriaDicasDAO = require('../model/DAO/intermed_categoria_dicasDAO.js')

const { request } = require('express')

const inserirIntermedCategoriaDicas = async function (dadosIntermedCategoriaDicas) {

    if (
        dadosIntermedCategoriaDicas.id_dicas == '' ||dadosIntermedCategoriaDicas.id_dicas == undefined || isNaN(dadosIntermedCategoriaDicas.id_dicas) ||
        dadosIntermedCategoriaDicas.id_categoria_dicas == '' ||dadosIntermedCategoriaDicas.id_categoria_dicas == undefined || isNaN(dadosIntermedCategoriaDicas.id_categoria_dicas)
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await intermedCategoriaDicasDAO.insertIntermedCategoriaDicas(dadosIntermedCategoriaDicas)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaDica = await intermedCategoriaDicasDAO.selectLastId()

            let dadosIntermedCategoriaDicasJSON = {}
            dadosIntermedCategoriaDicasJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosIntermedCategoriaDicasJSON.dica_categoria = novaDica

            return dadosIntermedCategoriaDicasJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarIntermedCategoriaDicas = async function (idIntermedCategoriaDicas) {
    let statusId = await intermedCategoriaDicasDAO.selectIntermedCategoriaDicasByID(idIntermedCategoriaDicas);

    if (statusId) {

        if (idIntermedCategoriaDicas == '' || idIntermedCategoriaDicas == undefined || isNaN(idIntermedCategoriaDicas)) {
            return message.ERROR_INVALID_ID; 

        } else {
            let resultDados = await intermedCategoriaDicasDAO.deleteIntermedCategoriaDicas(idIntermedCategoriaDicas)

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

const atualizarIntermedCategoriaDicas = async function (dadosIntermedCategoriaDicas, idIntermedCategoriaDicas) {

    if (
        dadosIntermedCategoriaDicas.id_dicas == '' ||dadosIntermedCategoriaDicas.id_dicas == undefined || isNaN(dadosIntermedCategoriaDicas.id_dicas) ||
        dadosIntermedCategoriaDicas.id_categoria_dicas == '' ||dadosIntermedCategoriaDicas.id_categoria_dicas == undefined || isNaN(dadosIntermedCategoriaDicas.id_categoria_dicas)
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idIntermedCategoriaDicas == '' || idIntermedCategoriaDicas == undefined || idIntermedCategoriaDicas == isNaN(idIntermedCategoriaDicas)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosIntermedCategoriaDicas.id = idIntermedCategoriaDicas;

        let statusId = await intermedCategoriaDicasDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await intermedCategoriaDicasDAO.updateIntermedCategoriaDicas(dadosIntermedCategoriaDicas);

            if (resultDados) {

                let dadosIntermedCategoriaDicasJSON = {}

                dadosIntermedCategoriaDicasJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosIntermedCategoriaDicasJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosIntermedCategoriaDicasJSON.dica_categoria = dadosIntermedCategoriaDicas
                return dadosIntermedCategoriaDicasJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getIntermedCategoriaDicas = async function () {
    let dadosIntermedCategoriaDicassJSON = {};


    let dadosIntermedCategoriaDicas = await intermedCategoriaDicasDAO.selectAllIntermedCategoriaDicas();

    if (dadosIntermedCategoriaDicas) {

        dadosIntermedCategoriaDicassJSON.status = message.SUCESS_REQUEST.status
        dadosIntermedCategoriaDicassJSON.message = message.SUCESS_REQUEST.message
        dadosIntermedCategoriaDicassJSON.quantidade = dadosIntermedCategoriaDicas.length;
        dadosIntermedCategoriaDicassJSON.dica_categoria =  dadosIntermedCategoriaDicas
        return  dadosIntermedCategoriaDicassJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getIntermedCategoriaDicasID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await intermedCategoriaDicasDAO.selectIntermedCategoriaDicasByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.dica_categoria = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirIntermedCategoriaDicas,
    deletarIntermedCategoriaDicas,
    atualizarIntermedCategoriaDicas,
    getIntermedCategoriaDicas,
    getIntermedCategoriaDicasID
}