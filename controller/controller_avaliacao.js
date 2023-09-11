/***************************************************************************************************************************************************
* Objetivo: Responsavel pela regra de negocio referente ao CRUD de avaliacao
* (GET, POST, PUT, DELETE)
* Data: 10/09/2023
* Autor: Caroline Portela
* Versão: 1.0
***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var avaliacaoDAO = require('../model/DAO/avaliacaoDAO.js')

const { request } = require('express')

const inserirAvaliacao = async function (dadosAvaliacao) {

    if (dadosAvaliacao.quantidade_estrela == '' || dadosAvaliacao.quantidade_estrela == undefined || 
        dadosAvaliacao.descricao == '' || dadosAvaliacao.descricao == undefined || dadosAvaliacao.descricao.length > 300 ||
        dadosAvaliacao.data_avaliacao == '' || dadosAvaliacao.data_avaliacao == undefined ||
        dadosAvaliacao.id_restaurante == '' || dadosAvaliacao.id_restaurante == undefined ||
        dadosAvaliacao.id_cliente == '' || dadosAvaliacao.id_cliente == undefined 

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await avaliacaoDAO.insertAvaliacao(dadosAvaliacao)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novaAvaliacao = await avaliacaoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.avaliacoes = novaAvaliacao

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarAvaliacao = async function (dadosAvaliacao, idAvaliacao) {

    if (dadosAvaliacao.quantidade_estrela == '' || dadosAvaliacao.quantidade_estrela == undefined || 
        dadosAvaliacao.descricao == '' || dadosAvaliacao.descricao == undefined || dadosAvaliacao.descricao.length > 300 ||
        dadosAvaliacao.data_avaliacao == '' || dadosAvaliacao.data_avaliacao == undefined ||
        dadosAvaliacao.id_restaurante == '' || dadosAvaliacao.id_restaurante == undefined ||
        dadosAvaliacao.id_cliente == '' || dadosAvaliacao.id_cliente == undefined 

    ) {
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idAvaliacao == '' || idAvaliacao == undefined || idAvaliacao == isNaN(idAvaliacao)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosAvaliacao.id = idAvaliacao;

        let statusId = await avaliacaoDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await avaliacaoDAO.updateAvaliacao(dadosAvaliacao);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.avaliacao = dadosAvaliacao
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarAvaliacao = async function (idAvaliacao) {
    let statusId = await avaliacaoDAO.selectAvaliacaoByID(idAvaliacao);

    if (statusId) {
        if (idAvaliacao == '' || idAvaliacao == undefined || isNaN(idAvaliacao)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await avaliacaoDAO.deleteAvaliacao(idAvaliacao)

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

const getAvaliacao = async function () {

    let dadosJSON = {};

    let dadosAvaliacao = await avaliacaoDAO.selectAllAvaliacao();

    if (dadosAvaliacao) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosAvaliacao.length;
        dadosJSON.avaliacao = dadosAvaliacao
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getAvaliacaoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await avaliacaoDAO.selectAvaliacaoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.avaliacao = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    deletarAvaliacao,
    getAvaliacaoPorID,
    getAvaliacao
}