/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela restaurante_pedido_cliente  no Banco de Dados
 * Data: 11/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


const insertRestaurantePedidoCliente = async function (dados) {
    let sql = `insert into tbl_restaurante_pedido_cliente (
        id_restaurante,
        id_pedido,
        id_cliente
    ) values (
        ${dados.id_restaurante},
        ${dados.id_pedido},
        ${dados.id_cliente}
    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteRestaurantePedidoCliente = async function (id) {
    let sql = `delete from tbl_restaurante_pedido_cliente where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

const updateRestaurantePedidoCliente = async function (dados) {
    let sql = `update tbl_restaurante_pedido_cliente set

                    id_restaurante = ${dados.id_restaurante},
                    id_pedido = ${dados.id_pedido},
                    id_cliente = ${dados.id_cliente}

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

const selectAllRestaurantePedidoCliente = async function () {
    let sql = `select * from tbl_restaurante_pedido_cliente`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectRestaurantePedidoClienteByID = async function (id) {
    let sql = `select * from tbl_restaurante_pedido_cliente where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_restaurante_pedido_cliente order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertRestaurantePedidoCliente,
    deleteRestaurantePedidoCliente,
    updateRestaurantePedidoCliente,
    selectAllRestaurantePedidoCliente,
    selectRestaurantePedidoClienteByID,
    selectLastId
}