/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela forma de ppagamento no Banco de Dados
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertFormaPagamento = async function (dados) {
    let sql = `insert into tbl_forma_pagamento (
        foto_bandeira,
        nome_forma_pagamento,
        tipo_forma_pagamento
    ) values (
        '${dados.foto_bandeira}',
        '${dados.nome_forma_pagamento}',
        '${dados.tipo_forma_pagamento}'

    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}


//////////////////////Deletes///////////////////////////
const deleteFormaPagamento = async function (id) {
    let sql = `delete from tbl_forma_pagamento where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

const updateFormaPagamento = async function (dados) {
    let sql = `update tbl_forma_pagamento set

                    foto_bandeira = '${dados.foto_bandeira}',
                    nome_forma_pagamento = '${dados.nome_forma_pagamento}',
                    tipo_forma_pagamento = '${dados.tipo_forma_pagamento}'

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

const selectAllFormaPagamento = async function () {
    let sql = `select * from tbl_forma_pagamento`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectFormaPagamentoByID = async function (id) {
    let sql = `select * from tbl_forma_pagamento where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_forma_pagamento order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}  

//verifica se a forma de pagamento inserida existe no banco de dados
const verificarFormaPagamentoExistente = async function (idFormaPagamento){

    let sql = `SELECT  * FROM tbl_forma_pagamento WHERE id = '${idFormaPagamento}';`

    let rsFormaPagamento = await prisma.$queryRawUnsafe(sql)

    if (rsFormaPagamento.length > 0) {
        return rsFormaPagamento;
    }
    else {
        return false;
    }
}


module.exports = {
    insertFormaPagamento,
    deleteFormaPagamento,
    updateFormaPagamento,
    selectAllFormaPagamento,
    selectFormaPagamentoByID,
    verificarFormaPagamentoExistente,
    selectLastId

}