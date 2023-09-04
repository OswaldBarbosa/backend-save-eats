/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação da tabela restaurante_funcionamento_dia_semana no Banco de Dados
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client');

var prisma = new PrismaClient();

 ////////////////////////Inserts//////////////////////////
 const insertRestauranteFuncionamentoDiaSemana = async function (dados) {
    let sql = `insert into tbl_restaurante_funcionamento_dia_semana (
        id_dia_semana,
        id_horario_funcionamento,
        id_restaurante
    ) values (
        ${dados.id_dia_semana},
        ${dados.id_horario_funcionamento},
        ${dados.id_restaurante}

    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteRestauranteFuncionamentoDiaSemana = async function (id) {
    let sql = `delete from tbl_restaurante_funcionamento_dia_semana where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateRestauranteFuncionamentoDiaSemana = async function (dados) {
    let sql = `update tbl_restaurante_funcionamento_dia_semana set
                    id_dia_semana = ${dados.id_dia_semana},
                    id_horario_funcionamento = ${dados.id_horario_funcionamento},
                    id_restaurante = ${dados.id_restaurante}',
          
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
const selectAllRestauranteFuncionamentoDiaSemana = async function () {
    let sql = `select * from tbl_restaurante_funcionamento_dia_semana`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectRestauranteFuncionamentoDiaSemanaByID = async function (id) {
    let sql = `select * from tbl_restaurante_funcionamento_dia_semana where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_restaurante_funcionamento_dia_semana order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertRestauranteFuncionamentoDiaSemana,
    deleteRestauranteFuncionamentoDiaSemana,
    updateRestauranteFuncionamentoDiaSemana,
    selectAllRestauranteFuncionamentoDiaSemana,
    selectRestauranteFuncionamentoDiaSemanaByID,
    selectLastId
}