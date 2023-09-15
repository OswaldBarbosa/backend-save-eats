/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação das views no banco de dados
 * Data: 15/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/
 
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


///////////////////////Selects //////////////////////////
const selectAllViewsPedidoProduto = async function () {
    let sql = `select * from vwPedidoProduto;`

    let rsViewsPedidoProduto = await prisma.$queryRawUnsafe(sql)

    if (rsViewsPedidoProduto.length > 0) {
        return rsViewsPedidoProduto;
    }
    else {
        return false;
    }
}

module.exports ={
    selectAllViewsPedidoProduto
}