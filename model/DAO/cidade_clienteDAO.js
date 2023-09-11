/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da cidade do cliente no Banco de Dados
 * Data: 06/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertCidadeCliente = async function (dadosCidadeCliente) {
    let sql = `insert into tbl_cidade_cliente (
        nome_cidade,
        id_estado_cliente
    ) values (
        '${dadosCidadeCliente.nome_cidade}',
        ${dadosCidadeCliente.id_estado_cliente}
    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteCidadeCliente = async function (id) {
    let sql = `delete from tbl_cidade_cliente where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateCidadeCliente = async function (dadosCidadeCliente) {
    let sql = `update tbl_cidade_cliente set
                    nome_cidade = '${dadosCidadeCliente.nome_cidade}',
                    id_estado_cliente = ${dadosCidadeCliente.id_estado_cliente}

                where id = ${dadosCidadeCliente.id}    
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

const selectAllCidadeCliente = async function () {
    let sql = `select * from tbl_cidade_cliente`

    let rsCidadeCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCidadeCliente.length > 0) {
        return rsCidadeCliente;
    }
    else {
        return false;
    }
}

const selectCidadeClienteByID = async function (id) {
    let sql = `select * from tbl_cidade_cliente where id = ${id}`

    let rsCidadeCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCidadeCliente.length > 0){
        return rsCidadeCliente
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_cidade_cliente order by id desc limit 1;`

    let rsCidadeCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCidadeCliente.length > 0){
        return rsCidadeCliente
    } else{
        return false
    }
   
}    


module.exports = {
   insertCidadeCliente,
   deleteCidadeCliente,
   updateCidadeCliente,
   selectAllCidadeCliente,
   selectCidadeClienteByID,
   selectLastId
}