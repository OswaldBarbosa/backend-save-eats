/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela frete_area_entrega
 * (GET, POST, PUT, DELETE)
 * Data: 06/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var freteAreaEntregaDAO = require('../model/DAO/frete_area_entregaDAO.js')

const { request } = require('express')

const inserirFreteAreaEntrega = async function (dados) {

    if (dados.km == '' || dados.km == undefined  ||
        dados.valor_entrega == '' || dados.valor_entrega == undefined  ||
        dados.tempo_entrega == '' || dados.tempo_entrega == undefined  ||
        dados.raio_entrega == '' || dados.raio_entrega == undefined  
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await freteAreaEntregaDAO.insertFreteAreaEntrega(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoFreteAreaEntrega = await freteAreaEntregaDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.frete_areas_entrega = novoFreteAreaEntrega

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarFreteAreaEntrega = async function (dados, idFreteAreaEntrega) {

    if (dados.km == '' || dados.km == undefined  ||
        dados.valor_entrega == '' || dados.valor_entrega == undefined  ||
        dados.tempo_entrega == '' || dados.tempo_entrega == undefined  ||
        dados.raio_entrega == '' || dados.raio_entrega == undefined  
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idFreteAreaEntrega == '' || idFreteAreaEntrega == undefined || idFreteAreaEntrega == isNaN(idFreteAreaEntrega)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idFreteAreaEntrega;

        let statusId = await freteAreaEntregaDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model
            let resultDados = await freteAreaEntregaDAO.updateFreteAreaEntrega(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.frete_area_entrega = dados
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const deletarFreteAreaEntrega = async function (idFreteAreaEntrega) {
    let statusId = await freteAreaEntregaDAO.selectFreteAreaEntregaAByID(idFreteAreaEntrega);

    if (statusId) {
        if (idFreteAreaEntrega == '' || idFreteAreaEntrega == undefined || isNaN(idFreteAreaEntrega)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await freteAreaEntregaDAO.deleteFreteAreaEntrega(idFreteAreaEntrega)

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

const getFreteAreaEntrega = async function () {

    let dadosJSON = {};

    let dados = await freteAreaEntregaDAO.selectAllFreteAreaEntrega();

    if (dados) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dados.length;
        dadosJSON.fretes_areas_entregas = dados
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getFreteAreaEntregaPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await freteAreaEntregaDAO.selectFreteAreaEntregaAByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.fretes_areas_entregas = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirFreteAreaEntrega,
    getFreteAreaEntrega,
    deletarFreteAreaEntrega,
    atualizarFreteAreaEntrega,
    getFreteAreaEntregaPorID
}
