/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD da CATEGORIA do produto
 * Data: 06/09/2023
 * Autor: Oswaldo Barbosa
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var produtoDAO = require('../model/DAO/produtoDAO.js')

const getAllProdutos = async () => {

    let dadosProdutoJSON = {}

    let dadosProduto = await produtoDAO.selectAllProdutos()

    if (dadosProduto) {

        dadosProdutoJSON.status = message.SUCESS_REQUEST.status
        dadosProdutoJSON.message = message.SUCESS_REQUEST.message
        dadosProdutoJSON.quantidade = dadosProduto.length
        dadosProdutoJSON.produtos = dadosProduto

        return dadosProdutoJSON

    } else {

        return message.ERROR_NOT_FOUND

    }

}

const getProdutosById = async (idProduto) => {

    if (idProduto == '' || idProduto == undefined || isNaN(idProduto)) {

        return message.ERROR_INVALID_ID

    } else {

        let dadosProdutoJSON = {}

        let dadosProduto = await produtoDAO.selectProdutoByID(idProduto)

        if (dadosProduto) {

            dadosProdutoJSON.status = message.SUCESS_REQUEST.status
            dadosProdutoJSON.message = message.SUCESS_REQUEST.message
            dadosProdutoJSON.produto = dadosProduto

            return dadosProdutoJSON

        } else {

            return message.ERROR_NOT_FOUND

        }

    }

}

const inserirProduto = async (dadosProduto) => {

    if (dadosProduto.nome == ''             || dadosProduto.nome == undefined               || !isNaN(dadosProduto.nome)                || dadosProduto.nome.length > 100 ||
    dadosProduto.descricao == undefined     || !isNaN(dadosProduto.descricao)                   ||
    dadosProduto.imagem == ''               || dadosProduto.imagem == undefined                 || !isNaN(dadosProduto.imagem)              || dadosProduto.imagem.length > 300 ||
    dadosProduto.preco == ''                || dadosProduto.preco == undefined                  || isNaN(dadosProduto.preco)                ||
    dadosProduto.id_status_produto == ''    || dadosProduto.id_status_produto == undefined      || isNaN(dadosProduto.id_status_produto)    ||
    dadosProduto.id_categoria_produto == '' || dadosProduto.id_categoria_produto == undefined   || isNaN(dadosProduto.id_categoria_produto) ||
    dadosProduto.id_restaurante == ''       || dadosProduto.id_restaurante == undefined         || isNaN(dadosProduto.id_restaurante)

    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let dadosProdutoJSON = {}

        let resultadoDadosProduto = await produtoDAO.insertProduto(dadosProduto)

        if (resultadoDadosProduto) {

            let novoProduto = await produtoDAO.selectLastId()

            dadosProdutoJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosProdutoJSON.message = message.SUCESS_CREATED_ITEM.message
            dadosProdutoJSON.produto = novoProduto

            return dadosProdutoJSON

        } else {

            return message.ERROR_INTERNAL_SERVER

        }

    }

}

const atualizarProduto = async (dadosProduto, idProduto) => {

    if (dadosProduto.nome == ''                 || dadosProduto.nome == undefined                   || !isNaN(dadosProduto.nome)                || dadosProduto.nome.length > 100 ||
        dadosProduto.descricao == undefined     || !isNaN(dadosProduto.descricao)                   ||
        dadosProduto.imagem == ''               || dadosProduto.imagem == undefined                 || !isNaN(dadosProduto.imagem)              || dadosProduto.imagem.length > 300 ||
        dadosProduto.preco == ''                || dadosProduto.preco == undefined                  || isNaN(dadosProduto.preco)                ||
        dadosProduto.id_status_produto == ''    || dadosProduto.id_status_produto == undefined      || isNaN(dadosProduto.id_status_produto)    ||
        dadosProduto.id_categoria_produto == '' || dadosProduto.id_categoria_produto == undefined   || isNaN(dadosProduto.id_categoria_produto) ||
        dadosProduto.id_restaurante == ''       || dadosProduto.id_restaurante == undefined         || isNaN(dadosProduto.id_restaurante)

    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idProduto == '' || idProduto == undefined || isNaN(idProduto)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosProduto.id = idProduto

        let statusId = await produtoDAO.selectProdutoByID(idProduto)

        if (statusId) {

            let resultadoDadosProduto = await produtoDAO.updateProduto(dadosProduto)

            if (resultadoDadosProduto) {

                let dadosProdutoJSON = {}

                dadosProdutoJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosProdutoJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosProdutoJSON.produto = dadosProduto

                return dadosProdutoJSON

            } else {

                return message.ERROR_INTERNAL_SERVER

            }

        } else {

            return message.ERROR_NOT_FOUND

        }

    }

}

const deletarProduto = async (idProduto) => {

    if (idProduto == '' || idProduto == undefined || isNaN(idProduto)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await produtoDAO.selectProdutoByID(idProduto)

        if (statusId) {

            let resultadoDadosProduto = await produtoDAO.deleteProduto(idProduto)

            if (resultadoDadosProduto) {

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
    getAllProdutos,
    getProdutosById,
    inserirProduto,
    atualizarProduto,
    deletarProduto
}