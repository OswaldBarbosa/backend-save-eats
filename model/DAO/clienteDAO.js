/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos USUARIOS CLIENTES no Banco de Dados
 * Data: 30/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


////////////////////////Inserts//////////////////////////
const insertCliente = async function (dadosCliente) {
    let sql = `insert into tbl_cliente (
        nome,
        email,
        senha,
        cpf,
        foto,
        telefone
    ) values (
        '${dadosCliente.nome}',
        '${dadosCliente.email}',
        '${dadosCliente.senha}',
        '${dadosCliente.cpf}',
        '${dadosCliente.foto}',
        '${dadosCliente.telefone}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteCliente = async function (id) {
    let sql = `delete from tbl_cliente where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateCliente = async function (dadosCliente) {
    let sql = `update tbl_cliente set
                    nome = '${dadosCliente.nome}',
                    email = '${dadosCliente.email}',
                    senha = '${dadosCliente.senha}',
                    cpf = '${dadosCliente.cpf}',
                    foto = '${dadosCliente.foto}',
                    telefone = '${dadosCliente.telefone}'


                where id = ${dadosCliente.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllClientes = async function () {
    let sql = `select * from tbl_cliente`

    let rsCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCliente.length > 0) {
        return rsCliente;
    }
    else {
        return false;
    }
}

const selectClienteByID = async function (id) {
    let sql = `select * from tbl_cliente where id = ${id}`

    let rsCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCliente.length > 0)
        return rsCliente
    else
        return false
}



const selectLastId = async function () {
    let sql = `select * from tbl_cliente order by id desc limit 1;`

    let rsCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCliente.length > 0)
        return rsCliente
    else
        return false
}          

module.exports = {
    insertCliente,
    deleteCliente,
    selectLastId,
    selectClienteByID,
    updateCliente,
    selectAllClientes
}