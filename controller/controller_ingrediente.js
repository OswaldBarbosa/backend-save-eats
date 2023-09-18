/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de ingredientes
 * Data: 18/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var ingredienteDAO = require('../model/DAO/ingredienteDAO.js')

const { request } = require('express')

const inserirIngrediente = async function (dadosIngrediente) {

    if (
        dadosIngrediente.foto == '' || dadosIngrediente.foto == undefined ||dadosIngrediente.foto.length > 300 ||
        dadosIngrediente.nome_ingrediente == undefined || dadosIngrediente.nome_ingrediente.length > 45 ||
        dadosIngrediente.quantidade == '' || dadosIngrediente.quantidade == undefined 
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await ingredienteDAO.insertIngrediente(dadosIngrediente)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoIngrediente = await ingredienteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.ingrediente = novoIngrediente

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const getIngrediente = async function () {

    let dadosIngredienteJSON = {};


    let dadosIngrediente = await ingredienteDAO.selectAllIngrediente();

    if (dadosIngrediente) {

        dadosIngredienteJSON.status = message.SUCESS_REQUEST.status
        dadosIngredienteJSON.message = message.SUCESS_REQUEST.message
        dadosIngredienteJSON.quantidade = dadosIngrediente.length;
        dadosIngredienteJSON.ingredientes =  dadosIngrediente
        return dadosIngredienteJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const deletarIngrediente = async function (idIngrediente) {

    let statusId = await ingredienteDAO.selectIngredienteByID(idIngrediente);

    if (statusId) {

        if (idIngrediente == '' || idIngrediente == undefined || isNaN(idIngrediente)) {
            return message.ERROR_INVALID_ID; 

        } else {
            let resultDados = await ingredienteDAO.deleteIngrediente(idIngrediente)

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

const atualizarIngrediente = async function (dadosIngrediente, idIngrediente) {

    if (
        dadosIngrediente.foto == '' || dadosIngrediente.foto == undefined ||dadosIngrediente.foto.length > 300 ||
        dadosIngrediente.nome_ingrediente == undefined || dadosIngrediente.nome_ingrediente.length > 45 ||
        dadosIngrediente.quantidade == '' || dadosIngrediente.quantidade == undefined 
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idIngrediente == '' || idIngrediente == undefined || idIngrediente == isNaN(idIngrediente)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosIngrediente.id = idIngrediente;

        let statusId = await ingredienteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await ingredienteDAO.updateIngrediente(dadosIngrediente);

            if (resultDados) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.ingrediente = dadosIngrediente
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


module.exports = {
    inserirIngrediente,
    getIngrediente,
    deletarIngrediente,
    atualizarIngrediente
}