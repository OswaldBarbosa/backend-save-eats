/***************************************************************************************************************************************************
* Objetivo: Responsavel pela regra de negocio referente ao CRUD da tabela de receitas
* Data: 05/10/2023
* Autor: Caroline Portela
* Versão: 1.0
***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var receitasDAO = require('../model/DAO/receitasDAO.js')

const { request } = require('express')

const inserirReceitas = async function (dados) {

    if (
        dados.nome == '' || dados.nome == undefined ||
        dados.foto == '' || dados.foto == undefined ||
        dados.descricao == '' || dados.descricao == undefined ||
        dados.numero_porcoes == '' || dados.numero_porcoes == undefined|| 
        dados.modo_preparo == '' || dados.modo_preparo == undefined || 
        dados.id_nivel_dificuldade == '' || dados.id_nivel_dificuldade == undefined ||
        dados.id_tempo_preparo == '' || dados.id_tempo_preparo == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDados = await receitasDAO.insertReceita(dados)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDados) {

            let novoRegistro = await receitasDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.receitas = novoRegistro

            return dadosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const getDetalhesReceitaPorId = async function (receita) {


    let idReceita = receita

    let dadosJSON = {}

    let dadosReceita = await receitasDAO.selectDetalhesReceitasByIdReceita(idReceita)

    if (dadosReceita) {
        dadosJSON.status = 200;  
        dadosJSON.detalhes_receita = dadosReceita
       
        return dadosJSON;
    } else {
        return {
            status: 404,  
            message: 'Receita não encontrada'
        };
    }

}

const getFiltrarReceitaPelaCategoria = async function (categoria) {


    let nomeCategoria = categoria

    let dadosJSON = {}

    let dadosReceita = await receitasDAO.selectDetalhesReceitasByNameCategoria(nomeCategoria)

    if (dadosReceita) {
        dadosJSON.status = 200;  
        dadosJSON.receita_da_categoria_escolhida = dadosReceita
       
        return dadosJSON;
    } else {
        return {
            status: 404,  
            message: 'Receita não encontrada'
        };
    }

}



module.exports = {
    inserirReceitas,
    getDetalhesReceitaPorId,
    getFiltrarReceitaPelaCategoria
}