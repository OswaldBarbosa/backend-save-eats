/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de horario de funcionamento dos restaurantes no Banco de Dados
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client');

var prisma = new PrismaClient();

 ////////////////////////Inserts//////////////////////////
 const insertHorarioFuncionamento = async function (dadosHorarioFuncionamento) {
    let sql = `insert into tbl_horario_funcionamento (
        dia,
        horario_inicio,
        horario_final
    ) values (
        '${dadosHorarioFuncionamento.dia}',
        '${dadosHorarioFuncionamento.horario_inicio}',
        '${dadosHorarioFuncionamento.horario_final}'

    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteHorarioFuncionamento = async function (id) {
    let sql = `delete from tbl_horario_funcionamento where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateHorarioFuncionamento = async function (dadosHorarioFuncionamento) {
    let sql = `update tbl_horario_funcionamento set
                    dia = '${dadosHorarioFuncionamento.dia}',
                    horario_inicio = '${dadosHorarioFuncionamento.horario_inicio}',
                    horario_final = '${dadosHorarioFuncionamento.horario_final}'
          
                where id = ${dadosHorarioFuncionamento.id}    
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
const selectAllHorarioFuncionamento = async function () {
    let sql = `select * from tbl_horario_funcionamento`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectHorarioFuncionamentoByID = async function (id) {
    let sql = `select * from tbl_horario_funcionamento where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_horario_funcionamento order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertHorarioFuncionamento,
    deleteHorarioFuncionamento,
    updateHorarioFuncionamento,
    selectAllHorarioFuncionamento,
    selectHorarioFuncionamentoByID,
    selectLastId
}