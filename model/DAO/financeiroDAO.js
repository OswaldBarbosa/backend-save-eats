/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos USUARIOS CLIENTES no Banco de Dados
 * Data: 06/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertFinanceiro = async function (dadosFinanceiro) {
    let sql = `insert into tbl_financeiro (
        valor_diario,
        data_financeiro,
        id_restaurante
    ) values (
        '${dadosFinanceiro.valor_diario}',
        '${dadosFinanceiro.data_financeiro}',
        '${dadosFinanceiro.id_restaurante}'

    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteFinanceiro = async function (id) {
    let sql = `delete from tbl_financeiro where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}


///////////////////////Updates//////////////////////////
const updateFinanceiro = async function (dadosFinanceiro) {
    let sql = `update tbl_financeiro set
                    valor_diario = '${dadosFinanceiro.valor_diario}',
                    data_financeiro = '${dadosFinanceiro.data_financeiro}'


                where id = ${dadosFinanceiro.id}    
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
const selectAllFinanceiro = async function () {
    let sql = `select * from tbl_financeiro`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectFinanceiroByID = async function (id) {
    let sql = `select * from tbl_financeiro where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_financeiro order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}    

module.exports = {
    insertFinanceiro,
    deleteFinanceiro,
    updateFinanceiro,
    selectAllFinanceiro,
    selectFinanceiroByID,
    selectLastId
}