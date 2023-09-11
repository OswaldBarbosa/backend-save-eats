/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados do status do produto no Banco de Dados
 * Data: 06/09/2023
 * Autor: Oswaldo Barbosa
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

//selecionar todos os status do produto
const selectAllStatusProduto = async () => {

    let sql = `select * from tbl_status_produto`

    let resultStatusProduto = await prisma.$queryRawUnsafe(sql)

    if (resultStatusProduto.length > 0) {
        return resultStatusProduto
    } else {
        return false
    }

}

//selecionar status do produto pelo id
const selectStatusProdutoByID = async (idStatusProduto) => {

    let sql = `select * from tbl_status_produto where id = ${idStatusProduto}`

    let resultStatusProduto = await prisma.$queryRawUnsafe(sql)

    if (resultStatusProduto.length > 0) {
        return resultStatusProduto
    } else {
        return false
    }

}

//selecionar o ultimo id do status produto inserido
const selectLastId = async () => {

    let sql = `select * from tbl_status_produto order by id desc limit 1`

    let resultStatusProduto = await prisma.$queryRawUnsafe(sql)

    if (resultStatusProduto.length > 0) {
        return resultStatusProduto
    } else {
        return false
    }

}

//inserir um status produto
const insertStatusProduto = async (dadosStatusProdutos) => {

    let sql = `insert into tbl_status_produto (
        status_produto
    )   values (
        '${dadosStatusProdutos.status_produto}'
    )`

    let resultStatusProduto = await prisma.$executeRawUnsafe(sql)

    if (resultStatusProduto) {
        return true
    } else {
        return false
    }

}

//atualizar um status produto
const updateStatusProduto = async (dadosStatusProdutos) => {

    let sql = `update tbl_status_produto set
               status_produto = '${dadosStatusProdutos.status_produto}'

               where id = ${dadosStatusProdutos.id}
               `

    let resultStatusProduto = await prisma.$executeRawUnsafe(sql)

    if (resultStatusProduto) {
        return true
    } else {
        return false
    }

}

//deletar um status produto
const deleteStatusProduto = async (idStatusProduto) => {

    let sql = `delete from tbl_status_produto where id = ${idStatusProduto}`

    let resultStatusProduto = await prisma.$executeRawUnsafe(sql)

    if (resultStatusProduto) {
        return true
    } else {
        return false
    }

}

module.exports = {
    selectAllStatusProduto,
    selectStatusProdutoByID,
    selectLastId,
    insertStatusProduto,
    updateStatusProduto,
    deleteStatusProduto
}