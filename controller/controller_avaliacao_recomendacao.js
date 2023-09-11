/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela avaliacao_recomendacao
 * (GET, POST, PUT, DELETE)
 * Data: 10/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var avaliacaoRecomendacaoDAO = require('../model/DAO/avaliacao_recomendacaoDAO.js')


const inserirAvaliacaoRecomendacao = async function (dados) {

    if (
        dados.id_avaliacao == '' || dados.id_avaliacao == undefined || isNaN(dados.id_avaliacao) ||
        dados.id_recomendacao == '' || dados.id_recomendacao == undefined || isNaN(dados.id_recomendacao) 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await avaliacaoRecomendacaoDAO.insertAvaliacaoRecomendacao(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistro = await avaliacaoRecomendacaoDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.avaliacao_recomendacao = novoRegistro

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}


const deletarAvaliacaoRecomendacao  = async function (idAvaliacaoRecomendacao) {
    let statusId = await avaliacaoRecomendacaoDAO.selectAvaliacaoRecomendacaoByID(idAvaliacaoRecomendacao);

    if (statusId) {
        if (idAvaliacaoRecomendacao == '' || idAvaliacaoRecomendacao == undefined || isNaN(idAvaliacaoRecomendacao)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await avaliacaoRecomendacaoDAO.deleteAvaliacaoRecomendacao(idAvaliacaoRecomendacao)

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

const atualizarAvaliacaoRecomendacao = async function (dados, idAvaliacaoRecomendacao) {

    if (
        dados.id_avaliacao == '' || dados.id_avaliacao == undefined || isNaN(dados.id_avaliacao) ||
        dados.id_recomendacao == '' || dados.id_recomendacao == undefined || isNaN(dados.id_recomendacao) 

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idAvaliacaoRecomendacao == '' || idAvaliacaoRecomendacao == undefined || idAvaliacaoRecomendacao == isNaN(idAvaliacaoRecomendacao)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idAvaliacaoRecomendacao;

        let statusId = await avaliacaoRecomendacaoDAO.selectLastId();

        if (statusId) {
      
            let resultDados = await avaliacaoRecomendacaoDAO.updateAvaliacaoRecomendacao(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.avaliacao_recomendacao = dados

                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getAvaliacaoRecomendacao = async function () {
    let dadosJSON = {};

    let dados = await avaliacaoRecomendacaoDAO.selectAllAvaliacaoRecomendacao();

    if (dados) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dados.length;
        dadosJSON.avaliacao_recomendacao = dados
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getAvaliacaoRecomendacaoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await avaliacaoRecomendacaoDAO.selectAvaliacaoRecomendacaoByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.avaliacao_recomendacao = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirAvaliacaoRecomendacao,
    atualizarAvaliacaoRecomendacao,
    deletarAvaliacaoRecomendacao,
    getAvaliacaoRecomendacao,
    getAvaliacaoRecomendacaoPorID
}