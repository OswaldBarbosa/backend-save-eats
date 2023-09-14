/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de nivel_dificuldade no Banco de Dados
 * Data: 14/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

//inserir um nivel dificuldade
const insertNivelDificuldade = async (dadosNivelDificuldade) => {

    let sql = `insert into tbl_nivel_dificuldade (
        nivel_dificuldade
    )   values (
        '${dadosNivelDificuldade.nivel_dificuldade}'
    )`

    let resultNivelDificuldade = await prisma.$executeRawUnsafe(sql)

    if (resultNivelDificuldade) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Update /////////////////////////////

//atualizar um tempo de preparo
const updateNivelDificuldade = async (dadosNivelDificuldade) => {

    let sql = `update tbl_nivel_dificuldade set
                nivel_dificuldade = '${dadosNivelDificuldade.nivel_dificuldade}'

               where id = ${dadosTempoPreparo.id}
               `

    let resultNivelDificuldade = await prisma.$executeRawUnsafe(sql)

    if (resultNivelDificuldade) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Delete /////////////////////////////

//deletar um tempo de preparo
const deleteNivelDificuldade = async (idNivelDificuldade) => {

    let sql = `delete from tbl_nivel_dificuldade where id = ${idNivelDificuldade}`

    let resultNivelDificuldade = await prisma.$executeRawUnsafe(sql)

    if (resultNivelDificuldade) {
        return true
    } else {
        return false
    }

}

/////////////////////////// Selects /////////////////////////////

//selecionar todos registros
const selectAllTNivelDificuldade = async () => {

    let sql = `select * from tbl_nivel_dificuldade`

    let resultNivelDificuldade = await prisma.$queryRawUnsafe(sql)

    if (resultNivelDificuldade.length > 0) {
        return resultNivelDificuldade
    } else {
        return false
    }

}

//selecionar tempo de preparo pelo id
const selectNivelDificuldadeById = async (idNivelDificuldade) => {

    let sql = `select * from tbl_nivel_dificuldade where id = ${idNivelDificuldade}`

    let resultNivelDificuldade = await prisma.$queryRawUnsafe(sql)

    if (resultNivelDificuldade.length > 0) {
        return resultNivelDificuldade
    } else {
        return false
    }

}

const selectLastId = async function () {
    let sql = `select * from tbl_nivel_dificuldade order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }
}   

module = {
    insertNivelDificuldade,
    updateNivelDificuldade,
    deleteNivelDificuldade,
    selectAllTNivelDificuldade,
    selectNivelDificuldadeById,
    selectLastId
}