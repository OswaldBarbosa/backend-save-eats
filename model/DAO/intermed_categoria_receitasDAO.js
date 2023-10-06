/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela intermediária entre categoria_receitas no Banco de Dados
 * Data: 06/10/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertIntermedCategoriaReceitas = async function (dados) {
    let sql = `insert into tbl_intermed_categoria_receitas(
        id_categoria_receitas,
        id_receitas
    )values(
        ${dados.id_categoria_receitas},
        ${dados.id_receitas}
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}


const selectLastId = async function () {
    let sql = `select * from tbl_intermed_categoria_receitas order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}  







module.exports = {
    insertIntermedCategoriaReceitas,
    selectLastId
}