/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da CATEGORIA do restaurante
 * Data: 31/08/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var categoriaDAO = require('../model/DAO/categoria_restauranteDAO.js')

const { request } = require('express')

const inserirCategoriaRestaurante = async function (dadosCategoria) {

    if (dadosCategoria.nome_categoria == '' ||dadosCategoria.nome_categoria == undefined || dadosCategoria.nome_categoria.length > 45
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await categoriaDAO.insertCategoriaRestaurante(dadosCategoria)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaCategoria = await categoriaDAO.selectLastId()

            let dadosCategoriaJSON = {}
            dadosCategoriaJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosCategoriaJSON.categorias = novaCategoria

            return dadosCategoriaJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarCategoriaRestaurante = async function (idCategoria) {
    let statusId = await categoriaDAO.selectCategoriaRestauranteByID(idCategoria);

    if (statusId) {
        if (idCategoria == '' || idCategoria == undefined || isNaN(idCategoria)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await categoriaDAO.deleteCategoriaRestaurante(idCategoria)

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

const atualizarCategoriaRestaurante = async function (dadosCategoria, idCategoria) {

    if (dadosCategoria.nome_categoria == '' ||dadosCategoria.nome_categoria == undefined || dadosCategoria.nome_categoria.length > 45
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idCategoria == '' || idCategoria == undefined || idCategoria == isNaN(idCategoria)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosCategoria.id = idCategoria;

        let statusId = await categoriaDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await categoriaDAO.updateCategoriaRestaurante(dadosCategoria);

            if (resultDados) {

                let dadosCategoriaJSON = {}

                dadosCategoriaJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosCategoriaJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosCategoriaJSON.categoria = dadosCategoria
                return dadosCategoriaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getCategoriaRestaurante = async function () {
    let dadosCategoriasJSON = {};


    let dadosCategoria = await categoriaDAO.selectAllCategoriaRestaurante();

    if (dadosCategoria) {

        dadosCategoriasJSON.status = message.SUCESS_REQUEST.status
        dadosCategoriasJSON.message = message.SUCESS_REQUEST.message
        dadosCategoriasJSON.quantidade = dadosCategoria.length;
        dadosCategoriasJSON.categorias =  dadosCategoria
        return  dadosCategoriasJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getCategoriaRestaurantePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await categoriaDAO.selectCategoriaRestauranteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.categoria = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const getRestaurantePelaCategoria = async function (categoria) {

    let nomeCategoria = categoria

    let dadosJSON = {}

    let dadosCategoriaRestaurante = await categoriaDAO.selectRestauranteByCategoria(nomeCategoria)
    if (dadosCategoriaRestaurante) {
        dadosJSON.restaurantes_da_categoria_escolhida = dadosCategoriaRestaurante
        return dadosJSON
    } else {
        return false;
    }
}



module.exports = {
    inserirCategoriaRestaurante,
    deletarCategoriaRestaurante,
    atualizarCategoriaRestaurante,
    getCategoriaRestaurante,
    getCategoriaRestaurantePorID,
    getRestaurantePelaCategoria
}