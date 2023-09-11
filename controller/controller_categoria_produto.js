/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD do STATUS do produto
 * Data: 06/09/2023
 * Autor: Oswaldo Barbosa
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var categoriaProdutosDAO = require('../model/DAO/categoria_produtoDAO.js')

const getAllCategoriaProduto = async () => {

    let dadosCategoriaProdutoJSON = {}

    let dadosCategoriaProduto = await categoriaProdutosDAO.selectAllCategoriasProduto()

    if (dadosCategoriaProduto) {
        dadosCategoriaProdutoJSON.status = message.SUCESS_REQUEST.status
        dadosCategoriaProdutoJSON.message = message.SUCESS_REQUEST.message
        dadosCategoriaProdutoJSON.quantidade = dadosCategoriaProduto.length
        dadosCategoriaProdutoJSON.categoria_produto = dadosCategoriaProduto

        return dadosCategoriaProdutoJSON

    } else {

        return message.ERROR_NOT_FOUND

    }

}

const getCategoriaProdutoById = async (idCategoriaProduto) => {

    let dadosCategoriaProdutoJSON = {}

    let dadosCategoriaProduto = await categoriaProdutosDAO.selectCategoriaProdutoById(idCategoriaProduto)

    if (dadosCategoriaProduto) {
        dadosCategoriaProdutoJSON.status = message.SUCESS_REQUEST.status
        dadosCategoriaProdutoJSON.message = message.SUCESS_REQUEST.message
        dadosCategoriaProdutoJSON.categoria_produto = dadosCategoriaProduto

        return dadosCategoriaProdutoJSON

    } else {

        return message.ERROR_NOT_FOUND

    }

}

const inserirCategoriaProduto = async (dadosCategoriaProduto) => {

    if (dadosCategoriaProduto.categoria_produto == '' || dadosCategoriaProduto.categoria_produto == undefined || !isNaN(dadosCategoriaProduto.categoria_produto) || dadosCategoriaProduto.categoria_produto.length > 45

    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let dadosCategoriaProdutoJSON = {}

        let resultadoDadosCategoriaProduto = await categoriaProdutosDAO.insertCategoriaProduto(dadosCategoriaProduto)

        if (resultadoDadosCategoriaProduto) {

            let novaCategoriaProduto = await categoriaProdutosDAO.selectLastId()

            dadosCategoriaProdutoJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosCategoriaProdutoJSON.message = message.SUCESS_CREATED_ITEM.message
            dadosCategoriaProdutoJSON.categoria_produto = novaCategoriaProduto

            return dadosCategoriaProdutoJSON

        } else {

            return message.ERROR_INTERNAL_SERVER

        }

    }

}

const atualizarCategoriaProduto = async (dadosCategoriaProduto, idCategoriaProduto) => {

    if (dadosCategoriaProduto.categoria_produto == '' || dadosCategoriaProduto.categoria_produto == undefined || !isNaN(dadosCategoriaProduto.categoria_produto) || dadosCategoriaProduto.categoria_produto.length > 45

    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idCategoriaProduto == '' || idCategoriaProduto == undefined || isNaN(idCategoriaProduto)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosCategoriaProduto.id = idCategoriaProduto

        let statusId = await categoriaProdutosDAO.selectCategoriaProdutoById(idCategoriaProduto)

        if (statusId) {

            let resultadoDadosCategoriaProduto = await categoriaProdutosDAO.updateCategoriaProduto(dadosCategoriaProduto)

            if (resultadoDadosCategoriaProduto) {

                let dadosCategoriaProdutoJSON = {}

                dadosCategoriaProdutoJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosCategoriaProdutoJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosCategoriaProdutoJSON.categoria_produto = dadosCategoriaProduto

                return dadosCategoriaProdutoJSON

            } else {

                return message.ERROR_INTERNAL_SERVER

            }

        } else {

            return message.ERROR_NOT_FOUND

        }

    }

}

const deletarCategoriaProduto = async (idCategoriaProduto) => {

    if (idCategoriaProduto == '' || idCategoriaProduto == undefined || isNaN(idCategoriaProduto)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await categoriaProdutosDAO.selectCategoriaProdutoById(idCategoriaProduto)

        if (statusId) {

            let resultadoDadosCategoriaProduto = await categoriaProdutosDAO.deleteCategoriaProduto(idCategoriaProduto)

            if (resultadoDadosCategoriaProduto) {

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
    getAllCategoriaProduto,
    getCategoriaProdutoById,
    inserirCategoriaProduto,
    atualizarCategoriaProduto,
    deletarCategoriaProduto
}