/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela restaurante_funcionamento_dia_semana
 * (GET, POST, PUT, DELETE)
 * Data: 30/08/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var restauranteFuncionamentoDiaSemanaDAO = require('../model/DAO/restaurante_funcionamento_dia_semanaDAO.js')

const { request } = require('express')

const inserirRestauranteFuncionamentoDiaSemana = async function (dados) {

    if (
        dados.id_dia_semana == '' || dados.id_dia_semana == undefined || isNaN(dados.id_dia_semana) ||
        dados.id_horario_funcionamento == '' || dados.id_horario_funcionamento == undefined || isNaN(dados.id_horario_funcionamento) ||
        dados.id_restaurante == '' || dados.id_restaurante == undefined || isNaN(dados.id_restaurante)  
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await restauranteFuncionamentoDiaSemanaDAO.insertRestauranteFuncionamentoDiaSemana(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistro = await restauranteFuncionamentoDiaSemanaDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.restaurante_funcionamento_dia_semana = novoRegistro

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarRestauranteFuncionamentoDiaSemana = async function (idRestauranteFuncionamentoDiaSemana) {
    let statusId = await restauranteFuncionamentoDiaSemanaDAO.selectRestauranteFuncionamentoDiaSemanaByID(idRestauranteFuncionamentoDiaSemana);

    if (statusId) {
        if (idRestauranteFuncionamentoDiaSemana == '' || idRestauranteFuncionamentoDiaSemana == undefined || isNaN(idRestauranteFuncionamentoDiaSemana)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await restauranteFuncionamentoDiaSemanaDAO.deleteRestauranteFuncionamentoDiaSemana(idRestauranteFuncionamentoDiaSemana)

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

const atualizarRestauranteFuncionamentoDiaSemana = async function (dados, idRestauranteFuncionamentoDiaSemana) {

    if (
        dados.id_dia_semana == '' || dados.id_dia_semana == undefined || isNaN(dados.id_dia_semana) ||
        dados.id_horario_funcionamento == '' || dados.id_horario_funcionamento == undefined || isNaN(dados.id_horario_funcionamento) ||
        dados.id_restaurante == '' || dados.id_restaurante == undefined || isNaN(dados.id_restaurante)  
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idRestauranteFuncionamentoDiaSemana == '' || idRestauranteFuncionamentoDiaSemana == undefined || idRestauranteFuncionamentoDiaSemana == isNaN(idRestauranteFuncionamentoDiaSemana)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idRestauranteFuncionamentoDiaSemana;

        let statusId = await restauranteFuncionamentoDiaSemanaDAO.selectLastId();

        if (statusId) {
      
            let resultDados = await restauranteFuncionamentoDiaSemanaDAO.updateRestauranteFuncionamentoDiaSemana(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.restaurante_funcionamento_dia_semana = dados

                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getRestauranteFuncionamentoDiaSemana = async function () {
    let dadosJSON = {};

    let dadosRestauranteFuncionamentoDiaSemana = await restauranteFuncionamentoDiaSemanaDAO.selectAllRestauranteFuncionamentoDiaSemana();

    if (dados) {
        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosRestauranteFuncionamentoDiaSemana.length;
        dadosJSON.restaurante_funcionamento_dia_semana = dados

        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getRestauranteFuncionamentoDiaSemanaPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await restauranteFuncionamentoDiaSemanaDAO.selectRestauranteFuncionamentoDiaSemanaByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.restaurante_funcionamento_dia_semana = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirRestauranteFuncionamentoDiaSemana,
    deletarRestauranteFuncionamentoDiaSemana,
    atualizarRestauranteFuncionamentoDiaSemana,
    getRestauranteFuncionamentoDiaSemana,
    getRestauranteFuncionamentoDiaSemanaPorID
}