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
//detalhes de uma dica
const selectDetalhesDicasByID = async function (id) {

    let sql = `
    SELECT d.id AS dica_id, d.nome AS nome_dica, d.foto AS foto_dica, d.descricao AS descricao_dica,
           c.id AS categoria_id, c.categoria AS nome_categoria
    FROM tbl_dicas AS d
    INNER JOIN tbl_intermed_categoria_dicas AS icd ON d.id = icd.id_dicas
    INNER JOIN tbl_categoria_dicas AS c ON icd.id_categoria_dicas = c.id
    WHERE d.id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } {
        return false
    }
}

const selectDicasByIDCategoria = async function (id) {
    let sql = `
    SELECT dicas.nome, dicas.foto, dicas.descricao
    FROM tbl_dicas AS dicas
    INNER JOIN tbl_intermed_categoria_dicas AS icd ON dicas.id = icd.id_dicas
    WHERE icd.id_categoria_dicas = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } {
        return false
    }
}


module.exports = {
    insertDicas,
    deleteDicas,
    updateDicas,
    selectAllDicas,
    selectDicasByID,
    selectLastId,
    selectDetalhesDicasByID,
    selectDicasByIDCategoria
}