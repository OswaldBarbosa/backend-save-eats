/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela ingredientes no Banco de Dados
 * Data: 18/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

/////////////////////////// Insert /////////////////////////////

const insertIngrediente = async function (dados) {

    let sql = `insert into tbl_ingrediente (
        foto,
        nome_ingrediente,
        quantidade
    )   values (
        '${dados.foto}',
        '${dados.nome_ingrediente}',
        '${dados.quantidade}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

/////////////////////////// Update /////////////////////////////

const updateIngrediente = async (dadosIngrediente) => {

    let sql = `update tbl_ingrediente set
                foto = '${dadosIngrediente.foto}',
                nome_ingrediente = '${dadosIngrediente.nome_ingrediente}',
                quantidade = '${dadosIngrediente.quantidade}'

               where id = ${dadosIngrediente.id}
               `

    let resultDadosIngrediente = await prisma.$executeRawUnsafe(sql)

    if (resultDadosIngrediente) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Delete /////////////////////////////

const deleteIngrediente = async (idIngrediente) => {

    let sql = `delete from tbl_ingrediente where id = ${idIngrediente}`

    let resultIngrediente = await prisma.$executeRawUnsafe(sql)

    if (resultIngrediente ) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Selects /////////////////////////////

const selectAllIngrediente = async () => {

    let sql = `select * from tbl_ingrediente`

    let resultIngrediente = await prisma.$queryRawUnsafe(sql)

    if (resultIngrediente.length > 0) {
        return resultIngrediente
    } else {
        return false
    }

}

const selectIngredienteByID = async function (id) {
    let sql = `select * from tbl_ingrediente where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } {
        return false
    }
}



const selectLastId = async function () {
    let sql = `select * from tbl_ingrediente order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }
}  

module.exports = {
    insertIngrediente,
    updateIngrediente,
    deleteIngrediente,
    selectAllIngrediente,
    selectIngredienteByID,
    selectLastId
}