/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela restaurante_frete_area_entrega
 * (GET, POST, PUT, DELETE)
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')


var restauranteFreteAreaEntregaDAO = require('../model/DAO/restaurante_frete_area_entregaDAO.js')

const inserirRestauranteFreteAreaEntrega = async function (dados) {

    if (
        dados.id_restaurante == '' || dados.id_restaurante == undefined || isNaN(dados.id_restaurante) ||
        dados.id_frete_area_entrega == '' || dados.id_frete_area_entrega == undefined || isNaN(dados.id_frete_area_entrega) 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await restauranteFreteAreaEntregaDAO.insertRestauranteFreteAreaEntrega(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRestauranteFreteAreaEntrega = await restauranteFreteAreaEntregaDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.restaurantes_fretes_areas_entregas = novoRestauranteFreteAreaEntrega

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarRestauranteFreteAreaEntrega = async function (idRestauranteFreteAreaEntrega) {
    let statusId = await restauranteFreteAreaEntregaDAO.selectRestauranteFreteAreaEntregaByID(idRestauranteFreteAreaEntrega);

    if (statusId) {
        if (idRestauranteFreteAreaEntrega == '' || idRestauranteFreteAreaEntrega == undefined || isNaN(idRestauranteFreteAreaEntrega)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await restauranteFreteAreaEntregaDAO.deleteRestauranteFreteAreaEntrega(idRestauranteFreteAreaEntrega)

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

const atualizarRestauranteFreteAreaEntrega = async function (dados, idRestauranteFreteAreaEntrega) {

    if (
        dados.id_restaurante == '' || dados.id_restaurante == undefined || isNaN(dados.id_restaurante) ||
        dados.id_frete_area_entrega == '' || dados.id_frete_area_entrega == undefined || isNaN(dados.id_frete_area_entrega) 

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idRestauranteFreteAreaEntrega == '' || idRestauranteFreteAreaEntrega == undefined || idRestauranteFreteAreaEntrega == isNaN(idRestauranteFreteAreaEntrega)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idRestauranteFreteAreaEntrega;

        let statusId = await restauranteFreteAreaEntregaDAO.selectLastId();

        if (statusId) {
      
            let resultDados = await restauranteFreteAreaEntregaDAO.updateRestauranteFreteAreaEntrega(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.restaurante_frete_area_entrega = dados

                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getRestauranteFreteAreaEntrega = async function () {
    let dadosJSON = {};

    let dadosRestauranteFreteAreaEntrega = await restauranteFreteAreaEntregaDAO.selectAllRestauranteFreteAreaEntrega();

    if (dadosRestauranteFreteAreaEntrega) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosRestauranteFreteAreaEntrega.length;
        dadosJSON.restaurantes_fretes_areas_entregas = dadosRestauranteFreteAreaEntrega
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getRestauranteFreteAreaEntregaPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await restauranteFreteAreaEntregaDAO.selectRestauranteFreteAreaEntregaByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.restaurante_frete_area_entrega = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


module.exports = {
    inserirRestauranteFreteAreaEntrega,
    atualizarRestauranteFreteAreaEntrega,
    deletarRestauranteFreteAreaEntrega,
    getRestauranteFreteAreaEntrega,
    getRestauranteFreteAreaEntregaPorID
}