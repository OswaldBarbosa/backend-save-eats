/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da categoria da receita no Banco de Dados
 * Data: 11/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

/////////////////////////// Insert /////////////////////////////

//inserir uma categoria da receita
const insertCategoriaReceita = async (dadosCategoriaReceita) => {

    let sql = `insert into tbl_categoria_receitas (
        categoria
    )   values (
        '${dadosCategoriaReceita.categoria}'
    )`

    let resultCategoria = await prisma.$executeRawUnsafe(sql)

    if (resultCategoria) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Update /////////////////////////////

//atualizar uma categoria de receita
const updateCategoriaReceita = async (dadosCategoriaReceitas) => {

    let sql = `update tbl_categoria_receitas set
               categoria = '${dadosCategoriaReceitas.categoria}'

               where id = ${dadosCategoriaReceitas.id}
               `

    let resultCategoria = await prisma.$executeRawUnsafe(sql)

    if (resultCategoria) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Delete /////////////////////////////

//deletar uma categoria de receita
const deleteCategoriaReceita = async (idCategoriaReceitas) => {

    let sql = `delete from tbl_categoria_receitas where id = ${idCategoriaReceitas}`

    let resultCategoriaReceitas = await prisma.$executeRawUnsafe(sql)

    if (resultCategoriaReceitas) {
        return true
    } else {
        return false
    }

}


/////////////////////////// Selects /////////////////////////////

//selecionar todas categorias das receitas
const selectAllCategoriasReceita = async () => {

    let sql = `select * from tbl_categoria_receitas`

    let resultCategoria = await prisma.$queryRawUnsafe(sql)

    if (resultCategoria.length > 0) {
        return resultCategoria
    } else {
        return false
    }

}

//selecionar categoria da receita pelo id
const selectCategoriaReceitaById = async (idCategoriaReceita) => {

    let sql = `select * from tbl_categoria_receitas where id = ${idCategoriaReceita}`

    let resultCategoria = await prisma.$queryRawUnsafe(sql)

    if (resultCategoria.length > 0) {
        return resultCategoria
    } else {
        return false
    }

}

//selecionar o ultimo id da categoria produto inserido
const selectLastId = async () => {

    let sql = `select * from tbl_categoria_receitas order by id desc limit 1`

    let resultCategoria = await prisma.$queryRawUnsafe(sql)

    if (resultCategoria.length > 0) {
        return resultCategoria
    } else {
        return false
    }

}


module.exports = {
    insertCategoriaReceita,
    updateCategoriaReceita,
    deleteCategoriaReceita,
    selectAllCategoriasReceita,
    selectCategoriaReceitaById,
    selectLastId
}