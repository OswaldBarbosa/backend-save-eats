/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela intermed_endereco_cliente
 * (GET, POST, PUT, DELETE)
 * Data: 06/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var intermedEnderecoClienteDAO = require('../model/DAO/intermed_endereco_clienteDAO')

const { request } = require('express')

const inserirIntermedEnderecoCliente = async function (dados) {

    if (
        dados.id_cliente == '' || dados.id_cliente == undefined || isNaN(dados.id_cliente) ||
        dados.id_endereco_cliente == '' || dados.id_endereco_cliente == undefined || isNaN(dados.id_endereco_cliente)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await intermedEnderecoClienteDAO.insertIntermedEnderecoCliente(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistro = await intermedEnderecoClienteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.enderecos_cliente = novoRegistro

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarIntermedEnderecoCliente = async function (idIntermedEnderecoCliente) {

    let statusId = await intermedEnderecoClienteDAO.selectIntermedEnderecoClienteByID(idIntermedEnderecoCliente);

    if (statusId) {

        if (idIntermedEnderecoCliente == '' || idIntermedEnderecoCliente == undefined || isNaN(idIntermedEnderecoCliente)) {
            return message.ERROR_INVALID_ID; //Status code 400

        } else {

            let resultDados = await intermedEnderecoClienteDAO.deleteIntermedEnderecoCliente(idIntermedEnderecoCliente)

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

const atualizarIntermedEnderecoCliente = async function (dados, idIntermedEnderecoCliente) {

    if (
        dados.id_cliente == '' || dados.id_cliente == undefined || isNaN(dados.id_cliente) ||
        dados.id_endereco_cliente == '' || dados.id_endereco_cliente == undefined || isNaN(dados.id_endereco_cliente)
    ) {
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idIntermedEnderecoCliente == '' || idIntermedEnderecoCliente == undefined || idIntermedEnderecoCliente == isNaN(idIntermedEnderecoCliente)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idIntermedEnderecoCliente;

        let statusId = await intermedEnderecoClienteDAO.selectLastId();

        if (statusId) {

            let resultDados = await intermedEnderecoClienteDAO.updateIntermedEnderecoCliente(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.enderecos_cliente = dados

                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getIntermedEnderecoCliente = async function () {
    let dadosJSON = {};

    let dadosIntermedEnderecoCliente = await intermedEnderecoClienteDAO.selectAllIntermedEnderecoCliente();

    if (dadosIntermedEnderecoCliente) {
        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosIntermedEnderecoCliente.length;
        dadosJSON.enderecos_cliente = dadosIntermedEnderecoCliente

        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getIntermedEnderecoClientePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await intermedEnderecoClienteDAO.selectIntermedEnderecoClienteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.enderecos_cliente = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirIntermedEnderecoCliente,
    atualizarIntermedEnderecoCliente,
    deletarIntermedEnderecoCliente,
    getIntermedEnderecoCliente,
    getIntermedEnderecoClientePorID
}