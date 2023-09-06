/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do Cidade Cliente
 * (GET, POST, PUT, DELETE)
 * Data: 06/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/
//Import do arquivo de configuração das variaveis, constantes e funções globais


var message = require('./modulo/config.js')

var cidadeClienteDAO = require('../model/DAO/cidade_clienteDAO.js')

const { request } = require('express')


const inserirCidadeCliente = async function (dadosCidadeCliente) {

    if (
        dadosCidadeCliente.nome_cidade == '' || dadosCidadeCliente.nome_cidade == undefined || dadosCidadeCliente.nome_cidade.length > 150 ||
        dadosCidadeCliente.id_estado_cliente  == '' || dadosCidadeCliente.id_estado_cliente == undefined

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await cidadeClienteDAO.insertCidadeCliente(dadosCidadeCliente)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaCidadeCliente = await cidadeClienteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.cidade_cliente = novaCidadeCliente

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarCidadeCliente = async function (idCidadeCliente) {
    let statusId = await cidadeClienteDAO.selectCidadeClienteByID(idCidadeCliente);

    if (statusId) {
        if (idCidadeCliente == '' || idCidadeCliente == undefined || isNaN(idCidadeCliente)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await cidadeClienteDAO.deleteCidadeCliente(idCidadeCliente)

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

const atualizarCidadeCliente = async function (dadosCidadeCliente, idCidadeCliente) {

    if (
        dadosCidadeCliente.nome_cidade == '' || dadosCidadeCliente.nome_cidade == undefined || dadosCidadeCliente.nome_cidade.length > 150 ||
        dadosCidadeCliente.id_estado_cliente  == '' || dadosCidadeCliente.id_estado_cliente == undefined
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idCidadeCliente == '' || idCidadeCliente == undefined || idCidadeCliente == isNaN(idCidadeCliente)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosCidadeCliente.id = idCidadeCliente;

        let statusId = await cidadeClienteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await cidadeClienteDAO.updateCidadeCliente(dadosCidadeCliente);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.cidade_cliente = dadosCidadeCliente
                return dadosCidadeCliente
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getCidadeCliente = async function () {
    let dadosJSON = {};


    let dadosCidadeCliente = await cidadeClienteDAO.selectAllCidadeCliente();

    if (dadosCidadeCliente) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosCidadeCliente.length;
        dadosJSON.cidade_cliente = dadosCidadeCliente
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getCidadeClientePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await cidadeClienteDAO.selectCidadeClienteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.cidades = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


module.exports = {
    inserirCidadeCliente,
    deletarCidadeCliente,
    atualizarCidadeCliente,
    getCidadeCliente,
    getCidadeClientePorID
}