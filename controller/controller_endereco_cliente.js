/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do Endereco do Cliente
 * Data: 06/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js');

var enderecoClienteDAO = require('../model/DAO/endereco_clienteDAO.js');

const { request } = require('express');

const inserirEnderecoCliente = async function (dadosEnderecoCliente) {

    if (dadosEnderecoCliente.rua == '' || dadosEnderecoCliente.rua == undefined || dadosEnderecoCliente.rua.length > 100 ||
        dadosEnderecoCliente.cep == '' || dadosEnderecoCliente.cep == undefined || 
        dadosEnderecoCliente.bairro == '' || dadosEnderecoCliente.bairro == undefined || dadosEnderecoCliente.bairro.length > 45 ||
        dadosEnderecoCliente.numero == '' || dadosEnderecoCliente.numero == undefined || 
        dadosEnderecoCliente.complemento == '' || dadosEnderecoCliente.complemento == undefined || dadosEnderecoCliente.complemento.length > 150 ||
        dadosEnderecoCliente.id_cidade_cliente == '' || dadosEnderecoCliente.id_cidade_cliente == undefined || isNaN(dadosEnderecoCliente.id_cidade_cliente) 
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await enderecoClienteDAO.insertEnderecoCliente(dadosEnderecoCliente)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaEndereco = await enderecoClienteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.endereco_do_cliente = novaEndereco
            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}


const deletarEnderecoCliente= async function (idEnderecoCliente) {
    let statusId = await enderecoClienteDAO.selectAllEnderecoCliente(idEnderecoCliente);

    if (statusId) {
        if (idEnderecoCliente == '' || idEnderecoCliente == undefined || isNaN(idEnderecoCliente)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await enderecoClienteDAO.deleteEnderecoCliente(idEnderecoCliente)

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

const atualizarEnderecoCliente = async function (dadosEnderecoCliente, idEnderecoCliente) {

    if (dadosEnderecoCliente.rua == '' || dadosEnderecoCliente.rua == undefined || dadosEnderecoCliente.rua.length > 100 ||
        dadosEnderecoCliente.cep == '' || dadosEnderecoCliente.cep == undefined || 
        dadosEnderecoCliente.bairro == '' || dadosEnderecoCliente.bairro == undefined || dadosEnderecoCliente.bairro.length > 45 ||
        dadosEnderecoCliente.numero == '' || dadosEnderecoCliente.numero == undefined || 
        dadosEnderecoCliente.complemento == '' || dadosEnderecoCliente.complemento == undefined || dadosEnderecoCliente.complemento.length > 150 ||
        dadosEnderecoCliente.id_cidade_cliente == '' || dadosEnderecoCliente.id_cidade_cliente == undefined || isNaN(dadosEnderecoCliente.id_cidade_cliente) 
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idEnderecoCliente == '' || idEnderecoCliente == undefined || idEnderecoCliente == isNaN(idEnderecoCliente)) {

        return message.message.ERROR_INVALID_ID
    } else {
        //PAREI AQUIIIII
        dadosEnderecoCliente.id = idEnderecoCliente;

        let statusId = await enderecoClienteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await enderecoClienteDAO.updateEnderecoCliente(dadosEnderecoCliente);

            if (resultDados) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.endereco_restaurante = dadosEnderecoCliente
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const getEnderecoCliente = async function () {
    let dadosEnderecoClienteJSON = {};


    let dadosEnderecoCliente = await enderecoClienteDAO.selectAllEnderecoCliente()

    if (dadosEnderecoCliente) {

        dadosEnderecoClienteJSON.status = message.SUCESS_REQUEST.status
        dadosEnderecoClienteJSON.message = message.SUCESS_REQUEST.message
        dadosEnderecoClienteJSON.quantidade = dadosEnderecoCliente.length;
        dadosEnderecoClienteJSON.endereco_cliente = dadosEnderecoCliente
        return  dadosEnderecoClienteJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getEnderecoClientePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await enderecoClienteDAO.selectEnderecoClienteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.endereco_cliente = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirEnderecoCliente,
    deletarEnderecoCliente,
    atualizarEnderecoCliente,
    getEnderecoCliente,
    getEnderecoClientePorID
}