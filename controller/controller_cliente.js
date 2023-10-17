  /***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do usuario cliente
 * (GET, POST, PUT, DELETE)
 * Data: 30/08/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var clienteDAO = require('../model/DAO/clienteDAO.js')

const { request } = require('express')


const inserirCliente = async function (dadosCliente) {

    if (dadosCliente.nome == '' || dadosCliente.nome == undefined || dadosCliente.nome.length > 150 ||
        dadosCliente.email == '' || dadosCliente.email == undefined || dadosCliente.email.length > 255 ||
        dadosCliente.senha == '' || dadosCliente.senha == undefined ||
        dadosCliente.cpf == '' || dadosCliente.cpf == undefined || '' ||
        dadosCliente.telefone == '' || dadosCliente.telefone == undefined || dadosCliente.telefone.length > 15||
        dadosCliente.token_recuperar_senha == '' || dadosCliente.token_recuperar_senha == undefined || 
        dadosCliente.tempo_expiracao == '' || dadosCliente.tempo_expiracao == undefined 


    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await clienteDAO.insertCliente(dadosCliente)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoCliente = await clienteDAO.selectLastId()

            let dadosClienteJSON = {}
            dadosClienteJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosClienteJSON.clientes = novoCliente

            return dadosClienteJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const deletarCliente = async function (idCliente) {
    let statusId = await clienteDAO.selectClienteByID(idCliente);

    if (statusId) {
        if (idCliente == '' || idCliente == undefined || isNaN(idCliente)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDadosCliente = await clienteDAO.deleteCliente(idCliente)

            if (resultDadosCliente) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const atualizarCliente = async function (dadosCliente, idCliente) {

    if (dadosCliente.nome == '' || dadosCliente.nome == undefined || dadosCliente.nome.length > 150 ||
        dadosCliente.email == '' || dadosCliente.email == undefined || dadosCliente.email.length > 255 ||
        dadosCliente.senha == '' || dadosCliente.senha == undefined ||
        dadosCliente.cpf == '' || dadosCliente.cpf == undefined || 
        dadosCliente.foto == '' || dadosCliente.foto == undefined ||
        dadosCliente.telefone == '' || dadosCliente.telefone == undefined || dadosCliente.telefone.length > 15||
        dadosCliente.token_recuperar_senha == '' || dadosCliente.token_recuperar_senha == undefined || 
        dadosCliente.tempo_expiracao == '' || dadosCliente.tempo_expiracao == undefined 


    ){
        return message.ERROR_INTERNAL_SERVER.ERROR_REQUIRED_FIELDS

    } else if (idCliente == '' || idCliente == undefined || idCliente == isNaN(idCliente)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dadosCliente.id = idCliente;

        let statusId = await clienteDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do cliente
            let resultDadosCliente = await clienteDAO.updateCliente(dadosCliente);

            if (resultDadosCliente) {

                let dadosClienteJSON = {}
                dadosClienteJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosClienteJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosClienteJSON.cliente = dadosCliente
                return dadosClienteJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getClientes = async function () {
    let dadosClientesJSON = {};


    let dadosCliente = await clienteDAO.selectAllClientes();

    if (dadosCliente) {

        dadosClientesJSON.status = message.SUCESS_REQUEST.status
        dadosClientesJSON.message = message.SUCESS_REQUEST.message
        dadosClientesJSON.quantidade = dadosCliente.length;
        dadosClientesJSON.clientes = dadosCliente
        return dadosClientesJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getClientePorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await clienteDAO.selectClienteByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.cliente = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getClienteByEmailSenha = async function (email, password) {
    
    if (
        email == '' || email == undefined || email.length > 255 ||
        password == '' || password == undefined || password.length > 150
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {

        // Import do JWT
        const jwt = require("../middleware/middlewareJWT.js");

        let clienteJSONEmailpassword = {}

        let dadosCliente = await clienteDAO.selectClienteByEmailPassword(email, password)

        if (dadosCliente != null && dadosCliente != undefined) {

            let tokenUser = await jwt.createJWT(dadosCliente[0].id);
            
            // Inclua o token no objeto dadosRestaurante
            dadosCliente[0].token = tokenUser;

            clienteJSONEmailpassword.status = message.SUCESS_REQUEST.status
            clienteJSONEmailpassword.clientes = dadosCliente;

            return clienteJSONEmailpassword

        } else {
            return message.ERROR_INVALID_EMAIL_PASSWORD
        }
    }
}


const getClienteByEmail = async function (email) {
    
    if (
        email == '' || email == undefined || email.length > 255 
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {

        // Import do JWT
        const jwt = require("../middleware/middlewareJWT.js");

        let clienteJSONEmailpassword = {}

        let dadosCliente = await clienteDAO.selectClienteByEmail(email)

        if (dadosCliente != null && dadosCliente != undefined) {

            let tokenUser = await jwt.createJWT(dadosCliente[0].id);
            
            // Inclua o token no objeto dadosRestaurante
            dadosCliente[0].token = tokenUser;

            clienteJSONEmailpassword.status = message.SUCESS_REQUEST.status
            clienteJSONEmailpassword.clientes = dadosCliente;

            return clienteJSONEmailpassword

        } else {
            return message.ERROR_INVALID_EMAIL_PASSWORD
        }
    }
}



const autenticarLoginClienteEmailSenha = async function (email, password) {
    
    if (
        email == '' || email == undefined || email.length > 255 ||
        password == '' || password == undefined || password.length > 150
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } 
    
    else {

        // Import do JWT
        const jwt = require("../middleware/middlewareJWT.js");

        let clienteJSONEmailpassword = {}

        let dadosCliente = await clienteDAO.selectClienteByEmailPassword(email, password)
        console.log(dadosCliente);

        if (dadosCliente) {

            let tokenUser = await jwt.createJWT(dadosCliente[0].id);
         
            
            // Inclua o token no objeto dadosRestaurante
            dadosCliente[0].token = tokenUser;
           
            clienteJSONEmailpassword.status = message.SUCESS_REQUEST.status
            clienteJSONEmailpassword.clientes = dadosCliente;
            clienteJSONEmailpassword.clientes = dadosCliente[0];

            return clienteJSONEmailpassword
            

        } else {
            return message.ERROR_INVALID_EMAIL_PASSWORD
        }
    }
}





module.exports = {
    deletarCliente,
    atualizarCliente,
    getClientes,
    getClientePorID,
    getClienteByEmailSenha,
    autenticarLoginClienteEmailSenha,
    getClienteByEmail
   
}