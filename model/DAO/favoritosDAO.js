/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela favoritos  no Banco de Dados
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertFavoritos = async function (dados) {
    let sql = `insert into tbl_favoritos (
        id_restaurante,
        id_cliente
    ) values (
        '${dados.id_restaurante}',
        '${dados.id_cliente}'
    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteFavoritos = async function (id) {
    let sql = `delete from tbl_favoritos where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

const updateFavoritos = async function (dados) {
    let sql = `update tbl_favoritos set

                    id_restaurante = ${dados.id_restaurante},
                    id_cliente = ${dados.id_cliente}

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

const selectAllFavoritos = async function () {
    let sql = `select * from tbl_favoritos`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectFavoritosByID = async function (id) {
    let sql = `select * from tbl_favoritos where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_favoritos order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}  

module.exports = {
    insertFavoritos,
    deleteFavoritos,
    updateFavoritos,
    selectAllFavoritos,
    selectFavoritosByID,
    selectLastId
}