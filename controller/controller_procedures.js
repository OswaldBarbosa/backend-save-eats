/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente as procedures
 * Data: 14/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var proceduresDAO = require('../model/DAO/procedureDAO.js')

const inserirCadastroProcedure = async (dadosCadastro) => {

    if  (dadosCadastro.nome == '' || dadosCadastro.nome == undefined  
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let dadosJSON = {}

        let resultadoDados = await proceduresDAO.proceduresRestauranteCadastro(dadosCadastro)

        if (resultadoDados) {

            let novoCadastro = await proceduresDAO()

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            dadosJSON.cadastro = novoCadastro

            return dadosJSON

        } else {

            return message.ERROR_INTERNAL_SERVER

        }

    }

}

module.exports = {
    inserirCadastroProcedure
}