/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do estado restaurante
 * (GET, POST, PUT, DELETE)
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var estadoRestauranteDAO = require('../model/DAO/estado_restauranteDAO.js')

const { request } = require('express')

const inserirEstadoRestaurante = async function (dadosEstadoRestaurante) {

    if (
        dadosEstadoRestaurante.nome_estado == '' || dadosEstadoRestaurante.nome_estado == undefined || dadosEstadoRestaurante.nome_estado.length > 45 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await estadoRestauranteDAO.insertEstadoRestaurante(dadosEstadoRestaurante)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoEstado = await estadoRestauranteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.estados = novoEstado

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarEstadoRestaurante = async function (idEstadoRestaurante) {
    let statusId = await estadoRestauranteDAO.selectEstadoRestauranteByID(idEstadoRestaurante);

    if (statusId) {
        if (idEstadoRestaurante == '' || idEstadoRestaurante == undefined || isNaN(idEstadoRestaurante)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await estadoRestauranteDAO.deleteEstadoRestaurante(idEstadoRestaurante)

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

const atualizarEstadoRestaurante = async function (dadosEstadoRestaurante, idEstadoRestaurante) {

    if (
        dadosEstadoRestaurante.nome_estado == '' || dadosEstadoRestaurante.nome_estado == undefined || dadosEstadoRestaurante.nome_estado.length > 45 

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idEstadoRestaurante == '' || idEstadoRestaurante == undefined || idCliente == isNaN(idEstadoRestaurante)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosEstadoRestaurante.id = idEstadoRestaurante;

        let statusId = await estadoRestauranteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await estadoRestauranteDAO.updateEstadoRestaurante(dadosEstadoRestaurante);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.estados = dadosEstadoRestaurante
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getEstadoRestaurante = async function () {
    let dadosJSON = {};


    let dadosEstadoRestaurante = await estadoRestauranteDAO.selectAllEstadoRestaurante();

    if (dadosEstadoRestaurante) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosEstadoRestaurante.length;
        dadosJSON.estados = dadosEstadoRestaurante
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getEstadoRestaurantePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await estadoRestauranteDAO.selectEstadoRestauranteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.estados = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


module.exports = {
    inserirEstadoRestaurante,
    deletarEstadoRestaurante,
    atualizarEstadoRestaurante,
    getEstadoRestaurante,
    getEstadoRestaurantePorID
}