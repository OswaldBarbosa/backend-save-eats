/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do Cidade Restaurante
 * (GET, POST, PUT, DELETE)
 * Data: 05/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/
//Import do arquivo de configuração das variaveis, constantes e funções globais


var message = require('./modulo/config.js')

var cidadeRestauranteDAO = require('../model/DAO/cidade_restauranteDAO.js')

const { request } = require('express')


const inserirCidadeRestaurante = async function (dadosCidadeRestaurante) {

    if (
        dadosCidadeRestaurante.nome_cidade == '' || dadosCidadeRestaurante.nome_cidade == undefined || dadosCidadeRestaurante.nome_cidade.length > 150 ||
        dadosCidadeRestaurante.id_estado_restaurante  == '' || dadosCidadeRestaurante.id_estado_restaurante == undefined

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await cidadeRestauranteDAO.insertCidadeRestaurante(dadosCidadeRestaurante)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaCidadeRestaurante = await cidadeRestauranteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.cidades_restaurante = novaCidadeRestaurante

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarCidadeRestaurante = async function (idCidadeRestaurante) {
    let statusId = await cidadeRestauranteDAO.selectCidadeRestauranteByID(idCidadeRestaurante);

    if (statusId) {
        if (idCidadeRestaurante == '' || idCidadeRestaurante == undefined || isNaN(idCidadeRestaurante)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await cidadeRestauranteDAO.deleteCidadeRestaurante(idCidadeRestaurante)

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

const atualizarCidadeRestaurante = async function (dadosCidadeRestaurante, idCidadeRestaurante) {

    if (
        dadosCidadeRestaurante.nome_cidade == '' || dadosCidadeRestaurante.nome_cidade == undefined || dadosCidadeRestaurante.nome_cidade.length > 150 ||
        dadosCidadeRestaurante.id_estado_restaurante  == '' || dadosCidadeRestaurante.id_estado_restaurante == undefined
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idCidadeRestaurante == '' || idCidadeRestaurante == undefined || idCidadeRestaurante == isNaN(idCidadeRestaurante)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosCidadeRestaurante.id = idCidadeRestaurante;

        let statusId = await cidadeRestauranteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await cidadeRestauranteDAO.updateCidadeRestaurante(dadosCidadeRestaurante);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.cidade_restaurante = dadosCidadeRestaurante
                return dadosCidadeRestaurante
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getCidadeRestaurante = async function () {
    let dadosJSON = {};


    let dadosCidadeRestaurante = await cidadeRestauranteDAO.selectAllCidadeRestaurante();

    if (dadosCidadeRestaurante) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosCidadeRestaurante.length;
        dadosJSON.cidade_restaurante = dadosCidadeRestaurante
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getCidadeRestaurantePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await cidadeRestauranteDAO.selectCidadeRestauranteByID(id)

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
    inserirCidadeRestaurante,
    deletarCidadeRestaurante,
    atualizarCidadeRestaurante,
    getCidadeRestaurante,
    getCidadeRestaurantePorID
}