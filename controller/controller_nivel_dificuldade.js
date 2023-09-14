/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de nivel_dificuldade
 * Data: 14/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var nivelDificuldadeDAO = require('../model/DAO/nivel_dificuldadeDAO.js')


const { request } = require('express')

const inserirNivelDificuldade = async function (dadosNivelDificuldade) {



}

module.exports = {
    inserirNivelDificuldade
}