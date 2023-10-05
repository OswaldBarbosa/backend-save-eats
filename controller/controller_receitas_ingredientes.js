/***************************************************************************************************************************************************
* Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela intermediaria receitas_ingredientes
* Data: 05/10/2023
* Autor: Caroline Portela
* Versão: 1.0
***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var receitasIngredienteDAO = require('../model/DAO/receitas_ingredientesDAO.js')

const { request } = require('express')

const inserirReceitasIngredientes = async function (dados) {

    if (
        dados.id_receitas == '' || dados.id_receitas == undefined ||
        dados.id_ingrediente == '' || dados.id_ingrediente == undefined 

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await receitasIngredienteDAO.insertReceitaIngrediente(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistro = await receitasIngredienteDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.id_das_receitas_e_ingredientes = novoRegistro

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}


module.exports = {
    inserirReceitasIngredientes
}