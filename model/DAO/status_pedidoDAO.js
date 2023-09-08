/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos status_pedido no Banco de Dados
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertStatusPedido = async function (dadosStatusPedido) {
    let sql = `insert into tbl_status_pedido(
        status_pedido
    ) values (
        '${dadosStatusPedido.status_pedido}'
  
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Delete///////////////////////////
const deleteStatusPedido = async function (id) {
    let sql = `delete from tbl_status_pedido where id = ${id};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Update//////////////////////////
const updateStatusPedido = async function (dadosStatusPedido) {
    let sql = `update tbl_status_pedido set
                    status_pedido = '${dadosStatusPedido.status_pedido};'
  
                    where id = ${dadosStatusPedido.id}    
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
const selectAllStatusPedido = async function () {
    let sql = `select * from tbl_status_pedido`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectStatusPedidoByID = async function (id) {
    let sql = `select * from tbl_status_pedido where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_status_pedido order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertStatusPedido,
    updateStatusPedido,
    deleteStatusPedido,
    selectAllStatusPedido,
    selectStatusPedidoByID,
    selectLastId
}