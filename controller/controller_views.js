/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente as views do banco de dados
 * Data: 15/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var viewsDAO = require('../model/DAO/viewsDAO.js')


const getViewsPedidoProduto = async function () {
    let dadosJSON = {};

    let dados = await viewsDAO.selectAllViewsPedidoProduto();

    if (dados) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dados.length;
        dadosJSON.produtos_do_pedido = dados
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

module.exports = {
    getViewsPedidoProduto
}