/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados do dias de funcionamento dos restaurantes no Banco de Dados
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

 ////////////////////////Inserts//////////////////////////
 const insertDiaSemana = async function (dadosDiaSemana) {
    let sql = `insert into tbl_dia_semana (
        dia_semana
    ) values (
        '${dadosDiaSemana.dia_semana}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteDiaSemana = async function (id) {
    let sql = `delete from tbl_dia_semana where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateDiaSemana = async function (dadosDiaSemana) {
    let sql = `update tbl_dia_semana set
                    dia_semana = '${dadosDiaSemana.dia_semana}'
          
                where id = ${dadosDiaSemana.id}    
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
const selectAllRegistroDiaSemana = async function () {
    let sql = `select * from tbl_dia_semana`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectDiaSemanaByID = async function (id) {
    let sql = `select * from tbl_dia_semana where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_dia_semana order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 
 
module.exports = {
    insertDiaSemana,
    deleteDiaSemana,
    updateDiaSemana,
    selectAllRegistroDiaSemana,
    selectDiaSemanaByID,
    selectLastId
}