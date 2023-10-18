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

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deletePedido = async function (id) {
    let sql = `delete from tbl_pedido where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
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
                    id_frete_area_entrega = ${dadosPedido.id_frete_area_entrega}


                where id = ${dadosPedido.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
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

    if (rs.length > 0) {
        return rs
    } {
        return false
    }


}

const selectLastId = async function () {
    let sql = `select * from tbl_pedido order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }

}

const selectAllDetalhesPedidoById = async function (idPedido) {
    let sql = ` 
        SELECT
        tbl_pedido.id as id_pedido, -- Alias para o id do pedido
        tbl_pedido_produto.id as id_pedido_produto,
        tbl_produto.id as id_produto,
        tbl_produto.nome as nome_produto,
        tbl_produto.descricao as descricao_produto,
        tbl_produto.imagem as imagem_produto,
        tbl_produto.preco as preco_produto,
        tbl_status_produto.id as id_status_produto,
        tbl_status_produto.status_produto,
        tbl_categoria_produto.id as id_categoria_produto,
        tbl_categoria_produto.categoria_produto,
        tbl_restaurante.id as id_restaurante,
        tbl_restaurante.nome_fantasia as nome_restaurante,
        tbl_pedido.numero_pedido,
        DATE_FORMAT(tbl_pedido.horario, '%H:%i') as horario_pedido,
        DATE_FORMAT(tbl_pedido.previsao_entrega, '%H:%i') as previsao_entrega,
        date_format(tbl_pedido.data_pedido, '%d/%m/%Y') as data_pedido,
        tbl_pedido.valor_total,
        tbl_status_pedido.status_pedido,
        tbl_restaurante_forma_pagamento.id as id_restaurante_forma_pagamento,
        tbl_forma_pagamento.id as id_forma_pagamento,
        tbl_forma_pagamento.nome_forma_pagamento,
        tbl_restaurante_frete_area_entrega.id as id_restaurante_frete_area_entrega,
        tbl_frete_area_entrega.id as id_frete_area_entrega,
        tbl_frete_area_entrega.km,
        tbl_frete_area_entrega.valor_entrega,
        tbl_frete_area_entrega.tempo_entrega,
        tbl_frete_area_entrega.raio_entrega,
        tbl_cliente.id as id_cliente,
        tbl_cliente.nome as nome_cliente,
        tbl_cliente.telefone as telefone_cliente

    FROM

        tbl_pedido_produto
        
        INNER JOIN tbl_produto
        ON tbl_pedido_produto.id_produto = tbl_produto.id

        INNER JOIN tbl_pedido
        ON tbl_pedido_produto.id_pedido = tbl_pedido.id

        INNER JOIN tbl_status_produto
        ON tbl_produto.id_status_produto = tbl_status_produto.id

        INNER JOIN tbl_categoria_produto
        ON tbl_produto.id_categoria_produto = tbl_categoria_produto.id

        INNER JOIN tbl_restaurante
        ON tbl_produto.id_restaurante = tbl_restaurante.id
        INNER JOIN tbl_status_pedido

        ON tbl_pedido.id_status_pedido = tbl_status_pedido.id
        INNER JOIN tbl_restaurante_forma_pagamento

        ON tbl_pedido.id_restaurante_forma_pagamento = tbl_restaurante_forma_pagamento.id
        INNER JOIN tbl_forma_pagamento

        ON tbl_restaurante_forma_pagamento.id_forma_pagamento = tbl_forma_pagamento.id
        INNER JOIN tbl_restaurante_frete_area_entrega

        ON tbl_pedido.id_restaurante_frete_area_entrega = tbl_restaurante_frete_area_entrega.id
        INNER JOIN tbl_frete_area_entrega

        ON tbl_restaurante_frete_area_entrega.id_frete_area_entrega = tbl_frete_area_entrega.id
        INNER JOIN tbl_cliente
        ON tbl_pedido.id_cliente = tbl_cliente.id

        WHERE tbl_pedido.id = ${idPedido};`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }

}

const selectAllDetalhesPedido = async function () {
    let sql = ` 
        SELECT
        tbl_pedido.id as id_pedido, -- Alias para o id do pedido
        tbl_pedido_produto.id as id_pedido_produto,
        tbl_produto.id as id_produto,
        tbl_produto.nome as nome_produto,
        tbl_produto.descricao as descricao_produto,
        tbl_produto.imagem as imagem_produto,
        tbl_produto.preco as preco_produto,
        tbl_status_produto.id as id_status_produto,
        tbl_status_produto.status_produto,
        tbl_categoria_produto.id as id_categoria_produto,
        tbl_categoria_produto.categoria_produto,
        tbl_restaurante.id as id_restaurante,
        tbl_restaurante.nome_fantasia as nome_restaurante,
        tbl_pedido.numero_pedido,
        DATE_FORMAT(tbl_pedido.horario, '%H:%i') as horario_pedido,
        DATE_FORMAT(tbl_pedido.previsao_entrega, '%H:%i') as previsao_entrega,
        date_format(tbl_pedido.data_pedido, '%d/%m/%Y') as data_pedido,
        tbl_pedido.valor_total,
        tbl_status_pedido.status_pedido,
        tbl_restaurante_forma_pagamento.id as id_restaurante_forma_pagamento,
        tbl_forma_pagamento.id as id_forma_pagamento,
        tbl_forma_pagamento.nome_forma_pagamento,
        tbl_restaurante_frete_area_entrega.id as id_restaurante_frete_area_entrega,
        tbl_frete_area_entrega.id as id_frete_area_entrega,
        tbl_frete_area_entrega.km,
        tbl_frete_area_entrega.valor_entrega,
        tbl_frete_area_entrega.tempo_entrega,
        tbl_frete_area_entrega.raio_entrega,
        tbl_cliente.id as id_cliente,
        tbl_cliente.nome as nome_cliente,
        tbl_cliente.telefone as telefone_cliente

    FROM

        tbl_pedido_produto
        
        INNER JOIN tbl_produto
        ON tbl_pedido_produto.id_produto = tbl_produto.id

        INNER JOIN tbl_pedido
        ON tbl_pedido_produto.id_pedido = tbl_pedido.id

        INNER JOIN tbl_status_produto
        ON tbl_produto.id_status_produto = tbl_status_produto.id

        INNER JOIN tbl_categoria_produto
        ON tbl_produto.id_categoria_produto = tbl_categoria_produto.id

        INNER JOIN tbl_restaurante
        ON tbl_produto.id_restaurante = tbl_restaurante.id
        INNER JOIN tbl_status_pedido

        ON tbl_pedido.id_status_pedido = tbl_status_pedido.id
        INNER JOIN tbl_restaurante_forma_pagamento

        ON tbl_pedido.id_restaurante_forma_pagamento = tbl_restaurante_forma_pagamento.id
        INNER JOIN tbl_forma_pagamento

        ON tbl_restaurante_forma_pagamento.id_forma_pagamento = tbl_forma_pagamento.id
        INNER JOIN tbl_restaurante_frete_area_entrega

        ON tbl_pedido.id_restaurante_frete_area_entrega = tbl_restaurante_frete_area_entrega.id
        INNER JOIN tbl_frete_area_entrega

        ON tbl_restaurante_frete_area_entrega.id_frete_area_entrega = tbl_frete_area_entrega.id
        INNER JOIN tbl_cliente
        ON tbl_pedido.id_cliente = tbl_cliente.id;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }

}

module.exports = {
    insertPedido,
    updatePedido,
    selectAllPedido,
    selectLastId,
    selectPedidoByID,
    deletePedido,
    selectAllDetalhesPedidoById,
    selectAllDetalhesPedido
}