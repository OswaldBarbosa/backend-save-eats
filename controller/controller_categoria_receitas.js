/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da CATEGORIA das receitas
 * Data: 11/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var categoriaReceitasDAO = require('../model/DAO/categoria_receitasDAO.js')

const { request } = require('express')

const inserirCategoriaReceitas = async function (dadosCategoria) {

    if (dadosCategoria.categoria == '' ||dadosCategoria.categoria == undefined || dadosCategoria.categoria.length > 45
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await categoriaReceitasDAO.insertCategoriaReceita(dadosCategoria)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaCategoria = await categoriaReceitasDAO.selectLastId()

            let dadosCategoriaJSON = {}
            dadosCategoriaJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosCategoriaJSON.categorias_receitas = novaCategoria

            return dadosCategoriaJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarCategoriaReceitas = async function (dadosCategoria, idCategoria) {

    if (dadosCategoria.categoria == '' ||dadosCategoria.categoria == undefined || dadosCategoria.categoria.length > 45
    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idCategoria == '' || idCategoria == undefined || idCategoria == isNaN(idCategoria)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosCategoria.id = idCategoria;

        let statusId = await categoriaReceitasDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDados = await categoriaReceitasDAO.updateCategoriaReceita(dadosCategoria);

            if (resultDados) {

                let dadosCategoriaJSON = {}

                dadosCategoriaJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosCategoriaJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosCategoriaJSON.categoria_receitas = dadosCategoria
                return dadosCategoriaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}



const deletarCategoriaReceitas = async function (idCategoria) {
    let statusId = await categoriaReceitasDAO.selectCategoriaReceitaById(idCategoria);

    if (statusId) {
        if (idCategoria == '' || idCategoria == undefined || isNaN(idCategoria)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await categoriaReceitasDAO.deleteCategoriaReceita(idCategoria)

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

const getCategoriaReceitas = async function () {
    let dadosCategoriasJSON = {};


    let dadosCategoriaReceitas = await categoriaReceitasDAO.selectAllCategoriasReceita();

    if (dadosCategoriaReceitas) {

        dadosCategoriasJSON.status = message.SUCESS_REQUEST.status
        dadosCategoriasJSON.message = message.SUCESS_REQUEST.message
        dadosCategoriasJSON.quantidade = dadosCategoriaReceitas.length;
        dadosCategoriasJSON.categorias =  dadosCategoriaReceitas
        return  dadosCategoriasJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getCategoriaReceitasPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await categoriaReceitasDAO.selectCategoriaReceitaById(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.categoria_receita = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}





module.exports = {
    inserirCategoriaReceitas,
    deletarCategoriaReceitas,
    getCategoriaReceitas,
    getCategoriaReceitasPorID,
    atualizarCategoriaReceitas
}