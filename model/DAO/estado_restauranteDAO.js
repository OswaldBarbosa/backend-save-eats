/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos estado_restaurante no Banco de Dados
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


const insertEstadoRestaurante = async function (dadosEstadoRestaurante) {
    let sql = `insert into tbl_estado_restaurante (
        nome_estado
    ) values (
        '${dadosEstadoRestaurante.nome_estado}'
  
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteEstadoRestaurante = async function (id) {
    let sql = `delete from tbl_estado_restaurante where id = ${id};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}


///////////////////////Updates//////////////////////////
const updateEstadoRestaurante = async function (dadosEstadoRestaurante) {
    let sql = `update tbl_estado_restaurante set
                    nome_estado = '${dadosEstadoRestaurante.nome_estado};'
  
                    where id = ${dadosEstadoRestaurante.id}    
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
const selectAllEstadoRestaurante = async function () {
    let sql = `select * from tbl_estado_restaurante`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectEstadoRestauranteByID = async function (id) {
    let sql = `select * from tbl_estado_restaurante where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_estado_restaurante order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertEstadoRestaurante,
    deleteEstadoRestaurante,
    updateEstadoRestaurante,
    selectAllEstadoRestaurante,
    selectEstadoRestauranteByID,
    selectLastId
}