/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente as procedures
 * Data: 14/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var proceduresDAO = require('../model/DAO/procedureDAO.js')
var restauranteDAO = require('../model/DAO/restauranteDAO.js')
var clienteDAO = require('../model/DAO/clienteDAO.js')

//funcao pra inserir cadastro do restaurante
const inserirCadastroProcedure = async (dadosCadastro) => {

    if  (dadosCadastro.nome_categoria == '' || dadosCadastro.nome_categoria == undefined  ||
         dadosCadastro.nome_estado == '' || dadosCadastro.nome_estado == undefined || 
         dadosCadastro.nome_cidade == '' || dadosCadastro.nome_cidade == undefined || 
         dadosCadastro.rua == '' || dadosCadastro.rua == undefined || 
         dadosCadastro.cep == '' || dadosCadastro.cep == undefined || 
         dadosCadastro.bairro == '' || dadosCadastro.bairro == undefined || 
         dadosCadastro.numero == '' || dadosCadastro.numero == undefined || 
         dadosCadastro.nome_proprietario == '' || dadosCadastro.nome_proprietario == undefined ||
         dadosCadastro.razao_social == '' || dadosCadastro.razao_social == undefined || 
         dadosCadastro.nome_fantasia == '' || dadosCadastro.nome_fantasia == undefined || 
         dadosCadastro.email == '' || dadosCadastro.email == undefined || 
         dadosCadastro.senha == '' || dadosCadastro.senha == undefined || 
         dadosCadastro.cnpj == '' || dadosCadastro.cnpj == undefined || 
         dadosCadastro.numero_telefone == '' || dadosCadastro.numero_telefone == undefined 
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {

        //verifica se o email inserido no cadastro ja e cadastrado
        const emailExistente = await restauranteDAO.verificarEmailExistenteRestaurante(dadosCadastro.email);
        if (emailExistente) {
            return message.ERROR_EMAIL_ALREADY_EXISTS;
        }

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.proceduresRestauranteCadastro(dadosCadastro)

        if (resultadoDados) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}



const inserirCadastroCliente = async (dadosCliente) => {

    if  (
        dadosCliente.nome == '' || dadosCliente.nome == undefined  ||
        dadosCliente.email == '' || dadosCliente.email == undefined  ||
        dadosCliente.senha == '' || dadosCliente.senha == undefined  ||
        dadosCliente.cpf == '' || dadosCliente.cpf == undefined ||
        dadosCliente.telefone == '' || dadosCliente.telefone == undefined ||
        dadosCliente.nome_estado == '' || dadosCliente.nome_estado == undefined ||
        dadosCliente.nome_cidade == '' || dadosCliente.nome_cidade == undefined ||
        dadosCliente.cep == '' || dadosCliente.cep == undefined ||
        dadosCliente.rua == '' || dadosCliente.rua == undefined ||
        dadosCliente.bairro == '' || dadosCliente.bairro == undefined ||
        dadosCliente.numero == '' || dadosCliente.numero == undefined 
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        //verifica se o email inserido no cadastro ja e cadastrado
        const emailExistenteCliente = await clienteDAO.verificarEmailExistenteCliente(dadosCliente.email);

        if (emailExistenteCliente) {
            return message.ERROR_EMAIL_ALREADY_EXISTS;
        }

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.procedureInsertCadastroCliente(dadosCliente)

        if (resultadoDados) {
         
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            
            return dadosJSON

        } else {

            return message.ERROR_INTERNAL_SERVER

        }

    }

}


const inserirProdutoNoCardapio = async (dadosProduto) => {

    if  (
        dadosProduto.nome == '' || dadosProduto.nome == undefined  ||
        dadosProduto.descricao == '' || dadosProduto.descricao == undefined  


    ) {
        console.log('e pra dar erro');
        return message.ERROR_REQUIRED_FIELDS

    } else {

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.procedureInsertProduto(dadosProduto)

        if (resultadoDados) {
         
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            
            return dadosJSON

        } else {

            return message.ERROR_INTERNAL_SERVER

        }

    }

}



module.exports = {
    inserirCadastroProcedure,
    inserirCadastroCliente,
    inserirProdutoNoCardapio
}