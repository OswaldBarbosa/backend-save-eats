/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das Dicas no Banco de Dados
 * Data: 07/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertDicas = async function (dados) {
    let sql = `insert into tbl_dicas(
        nome,
        foto,
        descricao
    )values(
        '${dados.nome}',
        '${dados.foto}',
        '${dados.descricao}'
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//////////////////////Deletes///////////////////////////
const deleteDicas = async function (id) {
    let sql = `delete from tbl_dicas where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

///////////////////////Updates//////////////////////////
const updateDicas = async function (dados) {
    let sql = `update tbl_dicas set  
                   nome = '${dados.nome}',
                   foto = '${dados.foto}',
                   descricao = '${dados.descricao}'

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
const selectAllDicas = async function () {
    let sql = `select * from tbl_dicas`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectDicasByID = async function (id) {
    let sql = `select * from tbl_dicas where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } {
        return false
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_dicas order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }
}    

module.exports = {
    insertDicas,
    deleteDicas,
    updateDicas,
    selectAllDicas,
    selectDicasByID,
    selectLastId
}