/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela favoritos
 * (GET, POST, PUT, DELETE)
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var favoritosDAO = require('../model/DAO/favoritosDAO.js')

const inserirFavoritos = async function (dados) {

    if (
        dados.id_restaurante == '' || dados.id_restaurante == undefined || isNaN(dados.id_restaurante) ||
        dados.id_cliente == '' || dados.id_cliente == undefined || isNaN(dados.id_cliente) 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await favoritosDAO.insertFavoritos(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoFavorito = await favoritosDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.restaurantes_favoritos_do_cliente = novoFavorito

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarFavoritos  = async function (idFavoritos) {
    let statusId = await favoritosDAO.selectFavoritosByID(idFavoritos);

    if (statusId) {
        if (idFavoritos == '' || idFavoritos == undefined || isNaN(idFavoritos)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await favoritosDAO.deleteFavoritos(idFavoritos)

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

const atualizarFavoritos = async function (dados, idFavoritos) {

    if (
        dados.id_restaurante == '' || dados.id_restaurante == undefined || isNaN(dados.id_restaurante) ||
        dados.id_cliente == '' || dados.id_cliente == undefined || isNaN(dados.id_cliente) 

    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idFavoritos == '' || idFavoritos == undefined || idFavoritos == isNaN(idFavoritos)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idFavoritos;

        let statusId = await favoritosDAO.selectLastId();

        if (statusId) {
      
            let resultDados = await favoritosDAO.updateFavoritos(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.restaurantes_favoritos_do_cliente = dados

                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const getFavoritos = async function () {
    let dadosJSON = {};

    let dados = await favoritosDAO.selectAllFavoritos();

    if (dados) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dados.length;
        dadosJSON.restaurantes_favoritos_do_cliente = dados
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getFavoritosPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await favoritosDAO.selectFavoritosByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.restaurante_favorito_do_cliente = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirFavoritos,
    atualizarFavoritos,
    deletarFavoritos,
    getFavoritos,
    getFavoritosPorID
}