/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos estado_cliente no Banco de Dados
 * Data: 05/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


const insertEstadoCliente = async function (dadosEstadoCliente) {
    let sql = `insert into tbl_estado_cliente(
        nome_estado
    ) values (
        '${dadosEstadoCliente.nome_estado}'
  
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Delete///////////////////////////
const deleteEstadoCliente = async function (id) {
    let sql = `delete from tbl_estado_cliente where id = ${id};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}


///////////////////////Update//////////////////////////
const updateEstadoCliente = async function (dadosEstadoCliente) {
    let sql = `update tbl_estado_cliente set
                    nome_estado = '${dadosEstadoCliente.nome_estado};'
  
                    where id = ${dadosEstadoCliente.id}    
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
const selectAllEstadoCliente = async function () {
    let sql = `select * from tbl_estado_cliente`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectEstadoClienteByID = async function (id) {
    let sql = `select * from tbl_estado_cliente where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_estado_cliente order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertEstadoCliente,
    deleteEstadoCliente,
    updateEstadoCliente,
    selectAllEstadoCliente,
    selectEstadoClienteByID,
    selectLastId
}