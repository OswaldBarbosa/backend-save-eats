/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do estado cliente
 * (GET, POST, PUT, DELETE)
 * Data: 05/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var estadoClienteDAO = require('../model/DAO/estado_clienteDAO')

const { request } = require('express')

const inserirEstadoCliente= async function (dadosEstadoCliente) {

    if (
        dadosEstadoCliente.nome_estado == '' || dadosEstadoCliente.nome_estado == undefined || dadosEstadoCliente.nome_estado.length > 45 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await estadoClienteDAO.insertEstadoCliente(dadosEstadoCliente)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoEstado = await estadoClienteDAO.selectLastId()

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

const deletarEstadoCliente = async function (idEstadoCliente) {
    let statusId = await estadoClienteDAO.selectAllEstadoCliente(idEstadoCliente);

    if (statusId) {
        if (idEstadoCliente == '' || idEstadoCliente == undefined || isNaN(idEstadoCliente)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await estadoClienteDAO.deleteEstadoCliente(idEstadoCliente)

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

const atualizarEstadoCliente = async function (dadosEstadoCliente, idEstadoCliente) {

    if (
        dadosEstadoCliente.nome_estado == '' || dadosEstadoCliente.nome_estado == undefined || dadosEstadoCliente.nome_estado.length > 45 

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idEstadoCliente == '' || idEstadoCliente == undefined || idEstadoCliente == isNaN(idEstadoCliente)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosEstadoCliente.id = idEstadoCliente;

        let statusId = await estadoClienteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await estadoClienteDAO.updateEstadoCliente(dadosEstadoCliente);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.estados = dadosEstadoCliente
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getEstadoCliente = async function () {
    let dadosJSON = {};


    let dadosEstadoCliente = await estadoClienteDAO.selectAllEstadoCliente();

    if (dadosEstadoCliente) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosEstadoCliente.length;
        dadosJSON.estados = dadosEstadoCliente
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getEstadoClientePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await estadoClienteDAO.selectEstadoClienteByID(id)

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
    inserirEstadoCliente,
    deletarEstadoCliente,
    atualizarEstadoCliente,
    getEstadoCliente,
    getEstadoClientePorID
}