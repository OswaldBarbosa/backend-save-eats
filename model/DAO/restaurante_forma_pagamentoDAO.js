/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de Forma Pagamento Aceitas do restaurante DAO no Banco de Dados
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertRestauranteFormaPagamento = async function (dados) {
    let sql = `insert into tbl_restaurante_forma_pagamento (
        id_restaurante,
        id_forma_pagamento
    ) values (
        '${dados.id_restaurante}',
        '${dados.id_forma_pagamento}'

    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteRestauranteFormaPagamento = async function (id) {
    let sql = `delete from tbl_restaurante_forma_pagamento where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateRestauranteFormaPagamento = async function (dados) {
    let sql = `update tbl_restaurante_forma_pagamento set
                    id_restaurante = '${dados.id_restaurante}',
                    id_forma_pagamento = '${dados.id_forma_pagamento}'


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
const selectAllRestauranteFormaPagamento = async function () {
    let sql = `select * from tbl_restaurante_forma_pagamento`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectRestauranteFormaPagamentoByID = async function (id) {
    let sql = `select * from tbl_restaurante_forma_pagamento where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_restaurante_forma_pagamento order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}    

module.exports = {
    insertRestauranteFormaPagamento,
    updateRestauranteFormaPagamento,
    deleteRestauranteFormaPagamento,
    selectAllRestauranteFormaPagamento,
    selectLastId,
    selectRestauranteFormaPagamentoByID
}