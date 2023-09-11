/***************************************************************************************************************************************************
* Objetivo: Responsavel pela regra de negocio referente ao CRUD de restaurante_pedido_Cliente
* (GET, POST, PUT, DELETE)
* Data: 11/09/2023
* Autor: Caroline Portela
* Versão: 1.0
***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var restaurantePedidoClienteDAO = require('../model/DAO/restaurante_pedido_clienteDAO.js')

const { request } = require('express')

const inserirRestaurantePedidoCliente = async function (dados) {

    if (
        dados.id_restaurante == '' || dados.id_restaurante == undefined ||
        dados.id_pedido == '' || dados.id_pedido == undefined ||
        dados.id_cliente == '' || dados.id_cliente == undefined 

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await restaurantePedidoClienteDAO.insertRestaurantePedidoCliente(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistro = await restaurantePedidoClienteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.restaurante_pedido_cliente = novoRegistro

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarRestaurantePedidoCliente = async function (dados, idRestaurantePedidoCliente) {

    if (
        dados.id_restaurante == '' || dados.id_restaurante == undefined ||
        dados.id_pedido == '' || dados.id_pedido == undefined ||
        dados.id_cliente == '' || dados.id_cliente == undefined 

    ) {
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idRestaurantePedidoCliente == '' || idRestaurantePedidoCliente == undefined || idRestaurantePedidoCliente == isNaN(idRestaurantePedidoCliente)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idRestaurantePedidoCliente;

        let statusId = await restaurantePedidoClienteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await restaurantePedidoClienteDAO.updateRestaurantePedidoCliente(dados);

            if (resultDados) {

                let dadosJSON = {}
                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.restaurante_pedido_cliente = dados
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarRestaurantePedidoCliente = async function (idRestaurantePedidoCliente) {
    let statusId = await restaurantePedidoClienteDAO.selectRestaurantePedidoClienteByID(idRestaurantePedidoCliente);

    if (statusId) {
        if (idRestaurantePedidoCliente == '' || idRestaurantePedidoCliente == undefined || isNaN(idRestaurantePedidoCliente)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await restaurantePedidoClienteDAO.deleteRestaurantePedidoCliente(idRestaurantePedidoCliente)

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

const getRestaurantePedidoCliente = async function () {

    let dadosJSON = {};

    let dadosRestaurantePedidoCliente = await restaurantePedidoClienteDAO.selectAllRestaurantePedidoCliente();

    if (dadosRestaurantePedidoCliente) {

        dadosJSON.status = message.SUCESS_REQUEST.status
        dadosJSON.message = message.SUCESS_REQUEST.message
        dadosJSON.quantidade = dadosRestaurantePedidoCliente.length;
        dadosJSON.restaurantes_pedidos_clientes = dadosRestaurantePedidoCliente
        return dadosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getRestaurantePedidoClientePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await restaurantePedidoClienteDAO.selectRestaurantePedidoClienteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.restaurante_pedido_cliente = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


module.exports ={
    inserirRestaurantePedidoCliente,
    atualizarRestaurantePedidoCliente,
    deletarRestaurantePedidoCliente,
    getRestaurantePedidoCliente,
    getRestaurantePedidoClientePorID
}