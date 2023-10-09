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

const deletarReceita = async function (idReceita) {

    let statusId = await receitasDAO.deleteReceita(idReceita);

    if (statusId) {

        if (idReceita == '' || idReceita == undefined || isNaN(idReceita)) {
            return message.ERROR_INVALID_ID; 

        } else {
            let resultDados = await receitasDAO.deleteReceita(idReceita)

            if ( resultDados) {
                return message.ERROR_INTERNAL_SERVER
            } else {
                return message.SUCESS_DELETED_ITEM
                
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const atualizarReceita = async function (dados, idReceita) {

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

    } else if (idReceita == '' || idReceita == undefined || idReceita == isNaN(idReceita)) {

        return message.message.ERROR_INVALID_ID
    } else {
        dados.id = idReceita;

        let statusId = await receitasDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDados = await receitasDAO.updateRecetia(dados);

            if (resultDados) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.receita_atualizada = dados
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}



const getDetalhesReceitaPorId = async function (receita) {
    
    let idReceita = receita;
    let dadosJSON = {};

    let dadosReceita = await receitasDAO.selectDetalhesReceitasByIdReceita(idReceita);

    if (dadosReceita) {
        // Se os detalhes da receita foram encontrados, processar os ingredientes
        const ingredientes = [];

        // Iterar pelos detalhes da receita para criar uma lista de ingredientes
        for (const detalhe of dadosReceita) {
            const ingrediente = {
                id_ingrediente: detalhe.id_ingredientes,
                nome_ingrediente: detalhe.nomes_ingredientes,
                quantidade: detalhe.quantidades_ingredientes,
                foto_ingrediente: detalhe.fotos_ingredientes
            };
            ingredientes.push(ingrediente);
        }

            dadosJSON.status = 200;
            dadosJSON.detalhes_receita = {
            nome_receita: dadosReceita[0].nome_receita,
            foto_receita: dadosReceita[0].foto_receita,
            descricao: dadosReceita[0].descricao,
            numero_porcoes: dadosReceita[0].numero_porcoes,
            modo_preparo: dadosReceita[0].modo_preparo,
            nivel_dificuldade: dadosReceita[0].nivel_dificuldade,
            tempo_preparo: dadosReceita[0].tempo_preparo,
            // Lista de ingredientes 
            ingredientes: ingredientes 
        };

        return dadosJSON;
    } else {
        return message.ERROR_NOT_FOUND
    }
}


const getFiltrarReceitaPelaCategoria = async function (categoria) {
    let nameCategoria = categoria;
    let dadosJSON = {};

    let dadosReceita = await receitasDAO.selectDetalhesReceitasByNameCategoria(nameCategoria);

    if (dadosReceita && dadosReceita.length > 0) {
        // Se os detalhes da receita foram encontrados, processar os ingredientes
        const ingredientes = [];

        // Iterar pelos detalhes da receita para criar uma lista de ingredientes
        for (const detalhe of dadosReceita) {
            const ingrediente = {
                id_ingrediente: detalhe.id_ingrediente,
                nome_ingrediente: detalhe.nome_ingrediente,
                quantidade: detalhe.quantidade,
                foto_ingrediente: detalhe.foto_ingrediente
            };
            ingredientes.push(ingrediente);
        }

            dadosJSON.status = 200;
            dadosJSON.detalhes_receita_da_categoria_escolhida = {
            nome_receita: dadosReceita[0].nome_receita,
            foto_receita: dadosReceita[0].foto_receita,
            descricao: dadosReceita[0].descricao,
            numero_porcoes: dadosReceita[0].numero_porcoes,
            modo_preparo: dadosReceita[0].modo_preparo,
            nivel_dificuldade: dadosReceita[0].nivel_dificuldade,
            tempo_preparo: dadosReceita[0].tempo_preparo,
            // Lista de ingredientes
            ingredientes: ingredientes
        };

        return dadosJSON;
    } else {
        return message.ERROR_NOT_FOUND;
    }
}



module.exports = {
    inserirReceitas,
    getDetalhesReceitaPorId,
    getFiltrarReceitaPelaCategoria,
    deletarReceita,
    atualizarReceita
}