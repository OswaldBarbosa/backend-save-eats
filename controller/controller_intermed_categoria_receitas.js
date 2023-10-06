/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela intermediária entre categoria e receitas
 * Data: 06/10/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var intermedCategoriReceitasDAO = require('../model/DAO/intermed_categoria_receitasDAO.js')

const { request } = require('express')


const inserirIntermedCategoriReceitas = async function (dadosIntermedCategoriaReceitas) {

    if (
        dadosIntermedCategoriaReceitas.id_categoria_receitas == '' || dadosIntermedCategoriaReceitas.id_categoria_receitas == undefined || isNaN(dadosIntermedCategoriaReceitas.id_categoria_receitas) ||
        dadosIntermedCategoriaReceitas.id_receitas == '' || dadosIntermedCategoriaReceitas.id_receitas == undefined || isNaN(dadosIntermedCategoriaReceitas.id_receitas)
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await intermedCategoriReceitasDAO.insertIntermedCategoriaReceitas(dadosIntermedCategoriaReceitas)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistro = await intermedCategoriReceitasDAO.selectLastId()

            let dadosIntermedJSON = {}
            dadosIntermedJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosIntermedJSON.id_da_categoria_da_receita_id_da_receita = novoRegistro

            return dadosIntermedJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

module.exports = {
    inserirIntermedCategoriReceitas
}