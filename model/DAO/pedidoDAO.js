/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos USUARIOS CLIENTES no Banco de Dados
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

 var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertPedido = async function (dados) {
    let sql = `insert into tbl_pedido (
        numero_pedido,
        horario,
        data_pedido,
        previsao_entrega,
        valor_total,
        id_status_pedido,
        id_forma_pagamento,
        id_frete_area_entrega
    ) values (
        '${dados.numero_pedido}',
        '${dados.horario}',
        '${dados.data_pedido}',
        '${dados.previsao_entrega}',
        '${dados.valor_total}',
        ${dados.id_status_pedido},
        ${dados.id_forma_pagamento},
        ${dados.id_frete_area_entrega}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deletePedido = async function (id) {
    let sql = `delete from tbl_pedido where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updatePedido = async function (dadosPedido) {
    let sql = `update tbl_pedido set
                    numero_pedido = '${dadosPedido.numero_pedido}',
                    horario = '${dadosPedido.horario}',
                    data_pedido = '${dadosPedido.data_pedido}',
                    previsao_entrega = '${dadosPedido.previsao_entrega}',
                    valor_total = '${dadosPedido.valor_total}',
                    id_status_pedido = ${dadosPedido.id_status_pedido},
                    id_forma_pagamento = ${dadosPedido.id_forma_pagamento},
                    id_frete_area_entrega = ${dadosPedido. id_frete_area_entrega}


                where id = ${dadosPedido.id}    
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
const selectAllPedido = async function () {
    let sql = `select * from tbl_pedido`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectPedidoByID = async function (id) {
    let sql = `select * from tbl_pedido where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_pedido order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}    

module.exports = {
    insertPedido,
    updatePedido,
    selectAllPedido,
    selectLastId,
    selectPedidoByID,
    deletePedido
}