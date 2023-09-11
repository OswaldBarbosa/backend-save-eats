/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da categoria do produto no Banco de Dados
 * Data: 06/09/2023
 * Autor: Oswaldo Barbosa
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

//selecionar todas categorias dos produtos
const selectAllCategoriasProduto = async () => {

    let sql = `select * from tbl_categoria_produto`

    let resultCategoriaProduto = await prisma.$queryRawUnsafe(sql)

    if (resultCategoriaProduto.length > 0) {
        return resultCategoriaProduto
    } else {
        return false
    }

}

//selecionar categoria do produto pelo id
const selectCategoriaProdutoById = async (idCategoriaProduto) => {

    let sql = `select * from tbl_categoria_produto where id = ${idCategoriaProduto}`

    let resultCategoriaProduto = await prisma.$queryRawUnsafe(sql)

    if (resultCategoriaProduto.length > 0) {
        return resultCategoriaProduto
    } else {
        return false
    }

}

//selecionar o ultimo id da categoria produto inserido
const selectLastId = async () => {

    let sql = `select * from tbl_categoria_produto order by id desc limit 1`

    let resultCategoriaProduto = await prisma.$queryRawUnsafe(sql)

    if (resultCategoriaProduto.length > 0) {
        return resultCategoriaProduto
    } else {
        return false
    }

}

//inserir uma categoria de produto
const insertCategoriaProduto = async (dadosCategoriaProduto) => {

    let sql = `insert into tbl_categoria_produto (
        categoria_produto
    )   values (
        '${dadosCategoriaProduto.categoria_produto}'
    )`

    let resultCategoriaProduto = await prisma.$executeRawUnsafe(sql)

    if (resultCategoriaProduto) {
        return true
    } else {
        return false
    }

}

//atualizar uma categoria de produto
const updateCategoriaProduto = async (dadosCategoriaProduto) => {

    let sql = `update tbl_categoria_produto set
               categoria_produto = '${dadosCategoriaProduto.categoria_produto}'

               where id = ${dadosCategoriaProduto.id}
               `

    let resultCategoriaProduto = await prisma.$executeRawUnsafe(sql)

    if (resultCategoriaProduto) {
        return true
    } else {
        return false
    }

}

//deletar uma categoria de produto
const deleteCategoriaProduto = async (idCategoriaProduto) => {

    let sql = `delete from tbl_categoria_produto where id = ${idCategoriaProduto}`

    let resultCategoriaProduto = await prisma.$executeRawUnsafe(sql)

    if (resultCategoriaProduto) {
        return true
    } else {
        return false
    }

}

module.exports = {
    selectAllCategoriasProduto,
    selectCategoriaProdutoById,
    selectLastId,
    insertCategoriaProduto,
    updateCategoriaProduto,
    deleteCategoriaProduto
}