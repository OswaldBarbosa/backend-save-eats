/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da CATEGORIA das dicas no Banco de Dados
 * Data: 07/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertCategoriaDicas = async function (dadosCategoria) {
    let sql = `insert into tbl_categoria_dicas(
        categoria
    )values(
        '${dadosCategoria.categoria}'
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//////////////////////Deletes///////////////////////////
const deleteCategoriaDicas = async function (id) {
    let sql = `delete from tbl_categoria_dicas where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

///////////////////////Updates//////////////////////////
const updateCategoriaDicas = async function (dadosCategoria) {
    let sql = `update tbl_categoria_dicas set  

                    categoria = '${dadosCategoria.categoria}'

                    where id = ${dadosCategoria.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

///////////////////////Selects//////////////////////////
const selectAllCategoriaDicas = async function () {
    let sql = `select * from tbl_categoria_dicas`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectCategoriaDicasByID = async function (id) {
    let sql = `select * from tbl_categoria_dicas where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } {
        return false
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_categoria_dicas order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }
}    

module.exports = {
    insertCategoriaDicas,
    deleteCategoriaDicas,
    updateCategoriaDicas,
    selectAllCategoriaDicas,
    selectCategoriaDicasByID,
    selectLastId
}