/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela intermediária entre categoria e dicas no Banco de Dados
 * Data: 07/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertIntermedCategoriaDicas = async function (dados) {
    let sql = `insert into tbl_intermed_categoria_dicas(
        id_dicas,
        id_categoria_dicas
    )values(
        ${dados.id_dicas},
        ${dados.id_categoria_dicas}
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//////////////////////Deletes///////////////////////////
const deleteIntermedCategoriaDicas = async function (id) {
    let sql = `delete from tbl_intermed_categoria_dicas where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

///////////////////////Updates//////////////////////////
const updateIntermedCategoriaDicas = async function (dados) {
    let sql = `update tbl_intermed_categoria_dicas set  
                   id_dicas = ${dados.id_dicas},
                   id_categoria_dicas = ${dados.id_categoria_dicas}

                    where id = ${dados.id}    
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
const selectAllIntermedCategoriaDicas = async function () {
    let sql = `select * from tbl_intermed_categoria_dicas`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectIntermedCategoriaDicasByID = async function (id) {
    let sql = `select * from tbl_intermed_categoria_dicas where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } {
        return false
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_intermed_categoria_dicas order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }
}    

module.exports = {
    insertIntermedCategoriaDicas,
    deleteIntermedCategoriaDicas,
    updateIntermedCategoriaDicas,
    selectAllIntermedCategoriaDicas,
    selectIntermedCategoriaDicasByID,
    selectLastId
}