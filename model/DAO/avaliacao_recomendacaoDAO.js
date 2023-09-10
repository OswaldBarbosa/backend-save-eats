/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela avaliacao_recomendacao  no Banco de Dados
 * Data: 10/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertAvaliacaoRecomendacao = async function (dados) {
    let sql = `insert into tbl_avaliacao_recomendacao (
        id_avaliacao,
        id_recomendacao
    ) values (
        '${dados.id_avaliacao}',
        '${dados.id_recomendacao}'
    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteAvaliacaoRecomendacao = async function (id) {
    let sql = `delete from tbl_avaliacao_recomendacao where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

const updateAvaliacaoRecomendacao = async function (dados) {
    let sql = `update tbl_avaliacao_recomendacao set

                    id_avaliacao = ${dados.id_avaliacao},
                    id_recomendacao = ${dados.id_recomendacao}

                where id = ${dados.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }
}

///////////////////////Selects//////////////////////////

const selectAllAvaliacaoRecomendacao = async function () {
    let sql = `select * from tbl_avaliacao_recomendacao`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectAvaliacaoRecomendacaoByID = async function (id) {
    let sql = `select * from tbl_avaliacao_recomendacao where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_avaliacao_recomendacao order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertAvaliacaoRecomendacao,
    updateAvaliacaoRecomendacao,
    deleteAvaliacaoRecomendacao,
    selectAllAvaliacaoRecomendacao,
    selectAvaliacaoRecomendacaoByID,
    selectLastId
}