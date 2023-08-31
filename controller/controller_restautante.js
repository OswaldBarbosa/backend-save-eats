/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do RESTAURANTE
 * (GET, POST, PUT, DELETE)
 * Data: 31/08/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')


var restauranteDAO = require('../model/DAO/restauranteDAO.js')

const inserirRestaurante = async function (dadosRestaurante) {

    if (
        dadosRestaurante.nome_proprietario == '' || dadosRestaurante.nome_proprietario == undefined || dadosRestaurante.nome_proprietario.length > 150 ||
        dadosRestaurante.nome_fantasia == '' || dadosRestaurante.nome_fantasia == undefined || dadosRestaurante.nome_fantasia.length > 150 ||
        dadosRestaurante.razao_social == '' || dadosRestaurante.razao_social == undefined || dadosRestaurante.razao_social > 150 ||
        dadosRestaurante.email == '' || dadosRestaurante.email == undefined || dadosRestaurante.email > 255 ||
        dadosRestaurante.senha == '' || dadosRestaurante.senha == undefined || dadosRestaurante.senha > 150 ||
        dadosRestaurante.id_categoria == '' || dadosRestaurante.id_categoria == undefined ||
        dadosRestaurante.id_endereco_restaurante == '' || dadosRestaurante.id_endereco_restaurante == undefined 

    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await restauranteDAO.insertRestaurante(dadosRestaurante)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRestaurante = await restauranteDAO.selectLastId()

            let dadosRestauranteJSON = {}
            dadosRestauranteJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosRestauranteJSON.restaurantes = novoRestaurante

            return dadosRestauranteJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarRestaurante = async function (idRestaurante) {
    let statusId = await restauranteDAO.selectRestauranteByID(idRestaurante);

    if (statusId) {
        if (idRestaurante == '' || idRestaurante == undefined || isNaN(idRestaurante)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await restauranteDAO.deleteRestaurante(idRestaurante)

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


module.exports = {
    inserirRestaurante,
    deletarRestaurante
}