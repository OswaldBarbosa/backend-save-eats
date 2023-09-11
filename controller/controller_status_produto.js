/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do STATUS do produto
 * Data: 06/09/2023
 * Autor: Oswaldo Barbosa
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var statusProdutosDAO = require('../model/DAO/status_produtoDAO.js')

const getAllStatusProduto = async () => {

    let dadosStatusProdutoJSON = {}

    let dadosStatusProduto = await statusProdutosDAO.selectAllStatusProduto()

    if (dadosStatusProduto) {
        dadosStatusProdutoJSON.status = message.SUCESS_REQUEST.status
        dadosStatusProdutoJSON.message = message.SUCESS_REQUEST.message
        dadosStatusProdutoJSON.quantidade = dadosStatusProduto.length
        dadosStatusProdutoJSON.status_produto = dadosStatusProduto

        return dadosStatusProdutoJSON

    } else {

        return message.ERROR_NOT_FOUND

    }

}

const getStatusProdutoById = async (idStatusProduto) => {

    let dadosStatusProdutoJSON = {}

    let dadosStatusProduto = await statusProdutosDAO.selectStatusProdutoByID(idStatusProduto)

    if (dadosStatusProduto) {
        dadosStatusProdutoJSON.status = message.SUCESS_REQUEST.status
        dadosStatusProdutoJSON.message = message.SUCESS_REQUEST.message
        dadosStatusProdutoJSON.status_produto = dadosStatusProduto

        return dadosStatusProdutoJSON

    } else {

        return message.ERROR_NOT_FOUND

    }

}

const inserirStatusProduto = async (dadosStatusProduto) => {

    if (dadosStatusProduto.status_produto == '' || dadosStatusProduto.status_produto == undefined || !isNaN(dadosStatusProduto.status_produto) || dadosStatusProduto.status_produto.length > 45

    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let dadosStatusProdutoJSON = {}

        let resultadoDadosStatusProduto = await statusProdutosDAO.insertStatusProduto(dadosStatusProduto)

        if (resultadoDadosStatusProduto) {

            let novoStatusProduto = await statusProdutosDAO.selectLastId()

            dadosStatusProdutoJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosStatusProdutoJSON.message = message.SUCESS_CREATED_ITEM.message
            dadosStatusProdutoJSON.status_produto = novoStatusProduto

            return dadosStatusProdutoJSON

        } else {

            return message.ERROR_INTERNAL_SERVER

        }

    }

}

const atualizarStatusProduto = async (dadosStatusProduto, idStatusProduto) => {

    if (dadosStatusProduto.status_produto == '' || dadosStatusProduto.status_produto == undefined || !isNaN(dadosStatusProduto.status_produto) || dadosStatusProduto.status_produto.length > 45

    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idStatusProduto == '' || idStatusProduto == undefined || isNaN(idStatusProduto)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosStatusProduto.id = idStatusProduto

        let statusId = await statusProdutosDAO.selectStatusProdutoByID(idStatusProduto)

        if (statusId) {

            let resultadoDadosStatusProduto = await statusProdutosDAO.updateStatusProduto(dadosStatusProduto)

            if (resultadoDadosStatusProduto) {

                let dadosStatusProdutoJSON = {}

                dadosStatusProdutoJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosStatusProdutoJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosStatusProdutoJSON.status_produto = dadosStatusProduto

                return dadosStatusProdutoJSON

            } else {

                return message.ERROR_INTERNAL_SERVER

            }

        } else {

            return message.ERROR_NOT_FOUND

        }

    }

}

const deletarStatusProduto = async (idStatusProduto) => {

    if (idStatusProduto == '' || idStatusProduto == undefined || isNaN(idStatusProduto)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await statusProdutosDAO.selectStatusProdutoByID(idStatusProduto)

        if (statusId) {

            let resultadoDadosStatusProduto = await statusProdutosDAO.deleteStatusProduto(idStatusProduto)

            if (resultadoDadosStatusProduto) {

                return message.SUCESS_DELETED_ITEM

            } else {

                return message.ERROR_INTERNAL_SERVER

            }

        } else {

            return message.ERROR_NOT_FOUND_ID

        }

    }

}

module.exports = {
    getAllStatusProduto,
    getStatusProdutoById,
    inserirStatusProduto,
    atualizarStatusProduto,
    deletarStatusProduto
}