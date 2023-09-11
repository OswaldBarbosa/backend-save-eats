/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela intermediaria pedido_produto  no Banco de Dados
 * Data: 11/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertPedidoProduto = async function (dados) {
    let sql = `insert into tbl_pedido_produto (
        id_pedido,
        id_produto
    ) values (
        ${dados.id_pedido},
        ${dados.id_produto}

    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deletePedidoProduto = async function (id) {
    let sql = `delete from tbl_pedido_produto where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

const updatePedidoProduto = async function (dados) {
    let sql = `update tbl_pedido_produto set

                    id_pedido = ${dados.id_pedido},
                    id_produto = ${dados.id_produto}

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

const selectAllPedidoProduto = async function () {
    let sql = `select * from tbl_pedido_produto`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectPedidoProdutoByID = async function (id) {
    let sql = `select * from tbl_pedido_produto where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_pedido_produto order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertPedidoProduto,
    updatePedidoProduto,
    deletePedidoProduto,
    selectAllPedidoProduto,
    selectPedidoProdutoByID,
    selectLastId
}