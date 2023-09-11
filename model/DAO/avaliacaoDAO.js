/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de avaliacao no Banco de Dados
 * Data: 10/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertAvaliacao = async function (dados) {
    let sql = `insert into tbl_avaliacao (
        quantidade_estrela,
        descricao,
        data_avaliacao,
        id_restaurante,
        id_cliente
    ) values (
        '${dados.quantidade_estrela}',
        '${dados.descricao}',
        '${dados.data_avaliacao}',
        ${dados.id_restaurante},
        ${dados.id_cliente}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteAvaliacao = async function (id) {
    let sql = `delete from tbl_avaliacao where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateAvaliacao = async function (dadosAvaliacao) {
    let sql = `update tbl_avaliacao set
                    quantidade_estrela = '${dadosAvaliacao.quantidade_estrela}',
                    descricao = '${dadosAvaliacao.descricao}',
                    data_avaliacao = '${dadosAvaliacao.data_avaliacao}',
                    id_restaurante = ${dadosAvaliacao.id_restaurante},
                    id_cliente = ${dadosAvaliacao.id_cliente}


                where id = ${dadosAvaliacao.id}    
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
const selectAllAvaliacao = async function () {
    let sql = `select * from tbl_avaliacao`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectAvaliacaoByID = async function (id) {
    let sql = `select * from tbl_avaliacao where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_avaliacao order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}    

module.exports = {
insertAvaliacao,
updateAvaliacao,
deleteAvaliacao,
selectAllAvaliacao,
selectAvaliacaoByID,
selectLastId
}