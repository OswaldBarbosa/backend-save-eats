/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados do TELEFONE do restaurante no Banco de Dados
 * Data: 31/08/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTelefoneRestaurante = async function (dadosTelefone) {

    let sql = `insert into tbl_telefone_restaurante (
        numero,
        id_restaurante,
    ) values (
        '${dadosTelefone.numero}',
         ${dadosTelefone.id_restaurante}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteTelefoneRestaurante = async function (id) {
    let sql = `delete from tbl_telefone_restaurante where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateTelefoneRestaurante = async function (dadosTelefone) {
    let sql = `update tbl_telefone_restaurante set
                    numero = '${dadosTelefone.numero}',
                    id_restaurante = ${dadosTelefone.id_restaurante}
          
                where id = ${dadosTelefone.id}    
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

const selectAllTelefoneRestaurante = async function () {
    let sql = `select * from tbl_telefone_restaurante`

    let rsTelefoneRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsTelefoneRestaurante.length > 0) {
        return rsTelefoneRestaurante;
    }
    else {
        return false;
    }
}

const selectTelefoneRestauranteByID = async function (id) {
    let sql = `select * from tbl_telefone_restaurante where id = ${id}`

    let rsTelefoneRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsTelefoneRestaurante.length > 0){
        return rsTelefoneRestaurante
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_telefone_restaurante order by id desc limit 1;`

    let rsRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsTelefoneRestaurante.length > 0){
        return rsTelefoneRestaurante
    } else{
        return false
    }
   
}   

module.exports = {
    insertTelefoneRestaurante,
    deleteTelefoneRestaurante,
    updateTelefoneRestaurante,
    selectAllTelefoneRestaurante,
    selectTelefoneRestauranteByID,
    selectLastId
}