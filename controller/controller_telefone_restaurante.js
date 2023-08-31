/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do telefone do restaurante
 * (GET, POST, PUT, DELETE)
 * Data: 31/08/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')


var telefoneRestauranteDAO = require('../model/DAO/telefone_restauranteDAO.js')

const inserirTelefoneDoRestaurante = async function (dadosTelefone) {

    if (
        dadosTelefone.numero == '' || dadosTelefone.numero == undefined || dadosTelefone.numero.length > 45||
        dadosTelefone.id_restaurante == '' || dadosTelefone.id_restaurante == undefined 
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await telefoneRestauranteDAO.insertTelefoneRestaurante(dadosTelefone)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoTelefone = await telefoneRestauranteDAO.selectLastId()

            let dadosTelefoneJSON = {}
            dadosTelefoneJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosTelefoneJSON.telefones = novoTelefone

            return dadosTelefoneJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarTelefoneDoRestaurante = async function (idTelefoneRestaurante) {
    let statusId = await telefoneRestauranteDAO.selectTelefoneRestauranteByID(idTelefoneRestaurante);

    if (statusId) {
        if (idTelefoneRestaurante == '' || idTelefoneRestaurante == undefined || isNaN(idTelefoneRestaurante)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await telefoneRestauranteDAO.deleteTelefoneRestaurante(idTelefoneRestaurante)

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

const atualizarTelefoneDoRestaurante = async function (dadosTelefone, idTelefone) {

    if (
        dadosTelefone.numero == '' || dadosTelefone.numero == undefined || dadosTelefone.numero.length > 45||
        dadosTelefone.id_restaurante == '' || dadosTelefone.id_restaurante == undefined 
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idTelefone == '' || idTelefone == undefined || idTelefone == isNaN(idTelefone)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosTelefone.id = idTelefone;

        let statusId = await telefoneRestauranteDAO.selectLastId();

        if (statusId) {
      
            let resultDados = await telefoneRestauranteDAO.updateTelefoneRestaurante(dadosTelefone);

            if (resultDados) {

                let dadosTelefoneRestauranteJSON = {}
                dadosTelefoneRestauranteJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosTelefoneRestauranteJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosTelefoneRestauranteJSON.telefones = dadosTelefone

                return dadosTelefoneRestauranteJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getTelefoneDoRestaurante = async function () {
    let dadosTelefoneJSON = {};

    let dadosTelefoneRestaurante = await telefoneRestauranteDAO.selectAllTelefoneRestaurante();

    if (dadosTelefoneRestaurante) {

        dadosTelefoneJSON.status = message.SUCESS_REQUEST.status
        dadosTelefoneJSON.message = message.SUCESS_REQUEST.message
        dadosTelefoneJSON.quantidade = dadosRestaurante.length;
        dadosTelefoneJSON.telefones = dadosTelefoneRestaurante
        return  dadosTelefoneJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTelefoneDoRestaurantePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await telefoneRestauranteDAO.selectTelefoneRestauranteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.telefone = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirTelefoneDoRestaurante,
    deletarTelefoneDoRestaurante,
    atualizarTelefoneDoRestaurante,
    getTelefoneDoRestaurante,
    getTelefoneDoRestaurantePorID
}