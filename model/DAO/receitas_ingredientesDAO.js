/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela intermediaria receitas_ingrediente  no Banco de Dados
 * Data: 05/10/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertReceitaIngrediente = async function (dados) {
    let sql = `insert into tbl_receitas_ingrediente (
        id_receitas,
        id_ingrediente
    ) values (
        ${dados.id_receitas},
        ${dados.id_ingrediente}

    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteReceitaIngrediente = async function (id) {
    let sql = `delete from tbl_receitas_ingrediente where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

const updateReceitaIngrediente = async function (dados) {
    let sql = `update tbl_receitas_ingrediente set

                    id_receitas = ${dados.id_receitas},
                    id_ingrediente = ${dados.id_ingrediente}

                where id = ${dados.id}    
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

const selectAllReceitaIngrediente = async function () {
    let sql = `select * from tbl_receitas_ingrediente`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}




const selectLastId = async function () {
    let sql = `select * from tbl_receitas_ingrediente order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 





module.exports = {
    insertReceitaIngrediente,
    deleteReceitaIngrediente,
    updateReceitaIngrediente,
    selectAllReceitaIngrediente,
    selectLastId
}