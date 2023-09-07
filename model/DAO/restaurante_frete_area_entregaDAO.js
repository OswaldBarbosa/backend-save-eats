/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados do Restaurante Frete Area Entrega  no Banco de Dados
 * Data: 07/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertRestauranteFreteAreaEntrega = async function (dados) {
    let sql = `insert into tbl_restaurante_frete_area_entrega (
        id_restaurante,
        id_frete_area_entrega
    ) values (
        '${dados.id_restaurante}',
        '${dados.id_frete_area_entrega}'
    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}


//////////////////////Deletes///////////////////////////
const deleteRestauranteFreteAreaEntrega = async function (id) {
    let sql = `delete from tbl_restaurante_frete_area_entrega where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}


///////////////////////Updates//////////////////////////
const updateRestauranteFreteAreaEntrega = async function (dados) {
    let sql = `update tbl_restaurante_frete_area_entrega set

                    id_restaurante = ${dados.id_restaurante},
                    id_frete_area_entrega = ${dados.id_frete_area_entrega}

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

const selectAllRestauranteFreteAreaEntrega = async function () {
    let sql = `select * from tbl_restaurante_frete_area_entrega`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectRestauranteFreteAreaEntregaByID = async function (id) {
    let sql = `select * from tbl_restaurante_frete_area_entrega where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_restaurante_frete_area_entrega order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}  

module.exports = {
    insertRestauranteFreteAreaEntrega,
    updateRestauranteFreteAreaEntrega,
    deleteRestauranteFreteAreaEntrega,
    selectAllRestauranteFreteAreaEntrega,
    selectLastId,
    selectRestauranteFreteAreaEntregaByID
}