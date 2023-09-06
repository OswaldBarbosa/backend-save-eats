/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação da tabela intermed_endereco_cliente no Banco de Dados
 * Data: 06/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client');

var prisma = new PrismaClient();

////////////////////////Inserts//////////////////////////
const insertIntermedEnderecoCliente = async function (dados) {
    let sql = `insert into tbl_intermed_endereco_cliente (
         id_cliente,
         id_endereco_cliente
     )   values (
         ${dados.id_cliente},
         ${dados.id_endereco_cliente}
     )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteIntermedEnderecoCliente = async function (id) {
    let sql = `delete from tbl_intermed_endereco_cliente where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateIntermedEnderecoCliente = async function (dados) {
    let sql = `update tbl_intermed_endereco_cliente set
            id_cliente = '${dados.id_cliente}',
            id_endereco_cliente = '${dados.id_endereco_cliente}'
                     
                 where id = ${dados.id}    
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
const selectAllIntermedEnderecoCliente = async function () {
    let sql = `select * from tbl_intermed_endereco_cliente`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectIntermedEnderecoClienteByID = async function (id) {
    let sql = `select * from tbl_intermed_endereco_cliente where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }

}

const selectLastId = async function () {
    let sql = `select * from tbl_intermed_endereco_cliente order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }

}

module.exports = {
    insertIntermedEnderecoCliente,
    deleteIntermedEnderecoCliente,
    updateIntermedEnderecoCliente,
    selectAllIntermedEnderecoCliente,
    selectIntermedEnderecoClienteByID,
    selectLastId
}

