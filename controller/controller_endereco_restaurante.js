/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do Endereco do Restaurante
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var enderecoRestauranteDAO = require('../model/DAO/endereco_restauranteDAO.js')

const { request } = require('express')

const inserirEnderecoRestaurante = async function (dadosEnderecoRestaurante) {

    if (dadosEnderecoRestaurante.rua == '' || dadosEnderecoRestaurante.rua == undefined || dadosEnderecoRestaurante.rua.length > 100 ||
        dadosEnderecoRestaurante.cep == '' || dadosEnderecoRestaurante.cep == undefined || 
        dadosEnderecoRestaurante.bairro == '' || dadosEnderecoRestaurante.bairro == undefined || dadosEnderecoRestaurante.bairro.length > 45 ||
        dadosEnderecoRestaurante.numero == '' || dadosEnderecoRestaurante.numero == undefined || 
        dadosEnderecoRestaurante.complemento == '' || dadosEnderecoRestaurante.complemento == undefined || dadosEnderecoRestaurante.complemento.length > 150
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await enderecoRestauranteDAO.insertEnderecoRestaurante(dadosEnderecoRestaurante)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaEndereco = await enderecoRestauranteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.endereco_do_restaurante = novaEndereco
            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarEnderecoRestaurante = async function (idEnderecoRestaurante) {
    let statusId = await enderecoRestauranteDAO.selectEnderecoRestauranteByID(idEnderecoRestaurante);

    if (statusId) {
        if (idEnderecoRestaurante == '' || idEnderecoRestaurante == undefined || isNaN(idEnderecoRestaurante)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await enderecoRestauranteDAO.deleteEnderecoRestaurante(idEnderecoRestaurante)

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

const atualizarEnderecoRestaurante = async function (dadosEnderecoRestaurante, idEnderecoRestaurante) {

    if (dadosEnderecoRestaurante.rua == '' || dadosEnderecoRestaurante.rua == undefined || dadosEnderecoRestaurante.rua.length > 100 ||
        dadosEnderecoRestaurante.cep == '' || dadosEnderecoRestaurante.cep == undefined || 
        dadosEnderecoRestaurante.bairro == '' || dadosEnderecoRestaurante.bairro == undefined || dadosEnderecoRestaurante.bairro.length > 45 ||
        dadosEnderecoRestaurante.numero == '' || dadosEnderecoRestaurante.numero == undefined || 
        dadosEnderecoRestaurante.complemento == '' || dadosEnderecoRestaurante.complemento == undefined || dadosEnderecoRestaurante.complemento.length > 150
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idEnderecoRestaurante == '' || idEnderecoRestaurante == undefined || idEnderecoRestaurante == isNaN(idEnderecoRestaurante)) {

        return message.message.ERROR_INVALID_ID
    } else {
        //PAREI AQUIIIII
        dadosEnderecoRestaurante.id = idEnderecoRestaurante;

        let statusId = await enderecoRestauranteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await enderecoRestauranteDAO.updateEnderecoRestaurante(dadosEnderecoRestaurante);

            if (resultDados) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.endereco_restaurante = dadosEnderecoRestaurante
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const getEnderecoRestaurante = async function () {
    let dadosEnderecoRestauranteJSON = {};


    let dadosEnderecoRestaurante = await enderecoRestauranteDAO.selectAllEnderecoRestaurante()

    if (dadosEnderecoRestaurante) {

        dadosEnderecoRestauranteJSON.status = message.SUCESS_REQUEST.status
        dadosEnderecoRestauranteJSON.message = message.SUCESS_REQUEST.message
        dadosEnderecoRestauranteJSON.quantidade = dadosEnderecoRestaurante.length;
        dadosEnderecoRestauranteJSON.enderecos_restaurantes = dadosEnderecoRestaurante
        return  dadosEnderecoRestauranteJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getEnderecoRestaurantePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await enderecoRestauranteDAO.selectEnderecoRestauranteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.endereco_restaurante = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirEnderecoRestaurante,
    deletarEnderecoRestaurante,
    atualizarEnderecoRestaurante,
    getEnderecoRestaurante,
    getEnderecoRestaurantePorID
}