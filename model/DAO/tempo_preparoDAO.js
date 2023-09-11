/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de tempo preparo no Banco de Dados
 * Data: 11/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

//inserir uma categoria da receita
const insertTempoPreparo = async (dadosTempoPreparo) => {

    let sql = `insert into tbl_tempo_preparo (
        tempo_preparo
    )   values (
        '${dadosTempoPreparo.tempo_preparo}'
    )`

    let resultTempoPreparo = await prisma.$executeRawUnsafe(sql)

    if (resultTempoPreparo) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Update /////////////////////////////

//atualizar um tempo de preparo
const updateTempoPreparo = async (dadosTempoPreparo) => {

    let sql = `update tbl_tempo_preparo set
                tempo_preparo = '${dadosTempoPreparo.tempo_preparo}'

               where id = ${dadosTempoPreparo.id}
               `

    let resultCategoria = await prisma.$executeRawUnsafe(sql)

    if (resultCategoria) {
        return true
    } else {
        return false
    }

}


/////////////////////////// Delete /////////////////////////////

//deletar um tempo de preparo
const deleteTempoPreparo = async (idTempoPreparo) => {

    let sql = `delete from tbl_tempo_preparo where id = ${idTempoPreparo}`

    let resultTempoPreparo = await prisma.$executeRawUnsafe(sql)

    if (resultTempoPreparo) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Selects /////////////////////////////

//selecionar todos tempos de preparo cadastrados
const selectAllTempoPreparo = async () => {

    let sql = `select * from tbl_tempo_preparo`

    let resultTempoPreparo = await prisma.$queryRawUnsafe(sql)

    if (resultTempoPreparo.length > 0) {
        return resultTempoPreparo
    } else {
        return false
    }

}

//selecionar tempo de preparo pelo id
const selectTempoPreparoById = async (idTempoPreparo) => {

    let sql = `select * from tbl_tempo_preparo where id = ${idTempoPreparo}`

    let resultTempoPreparo = await prisma.$queryRawUnsafe(sql)

    if (resultTempoPreparo.length > 0) {
        return resultTempoPreparo
    } else {
        return false
    }

}

const selectLastId = async function () {
    let sql = `select * from tbl_tempo_preparo order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }
}    


module.exports = {
    insertTempoPreparo,
    updateTempoPreparo,
    selectAllTempoPreparo,
    selectTempoPreparoById,
    deleteTempoPreparo,
    selectLastId
}