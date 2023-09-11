/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela Recomendação  no Banco de Dados
 * Data: 10/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertRecomendacao = async function (dadosRecomendacao) {
    let sql = `insert into tbl_recomendacao (
        recomendacao
    ) values (
        '${dadosRecomendacao.recomendacao}'

    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteRecomendacao = async function (id) {
    let sql = `delete from tbl_recomendacao where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateRecomendacao = async function (dadosRecomendacao) {
    let sql = `update tbl_recomendacao set
                   recomendacao = '${dadosRecomendacao.recomendacao}'

                where id = ${dadosRecomendacao.id}    
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
const selectAllRecomendacao = async function () {
    let sql = `select * from tbl_recomendacao`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectRecomendacaoByID = async function (id) {
    let sql = `select * from tbl_recomendacao where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}


const selectLastId = async function () {
    let sql = `select * from tbl_recomendacao order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}  

module.exports = {
    insertRecomendacao,
    updateRecomendacao,
    deleteRecomendacao,
    selectAllRecomendacao,
    selectRecomendacaoByID,
    selectLastId
}