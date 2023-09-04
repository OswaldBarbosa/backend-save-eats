/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação do endereco do restaurante no Banco de Dados
 * Data: 04/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client');

var prisma = new PrismaClient();

 ////////////////////////Inserts//////////////////////////
 const insertEnderecoRestaurante = async function (dadosEnderecoRestaurante) {
    let sql = `insert into tbl_endereco_restaurante (
        rua,
        cep,
        bairro,
        numero,
        complemento,
        id_cidade_restaurante
    ) values (
        '${dadosEnderecoRestaurante.rua}',
        '${dadosEnderecoRestaurante.cep}',
        '${dadosEnderecoRestaurante.bairro}',
        '${dadosEnderecoRestaurante.numero}',
        '${dadosEnderecoRestaurante.complemento}',
        ${dadosEnderecoRestaurante.id_cidade_restaurante}


    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteEnderecoRestaurante = async function (id) {
    let sql = `delete from tbl_endereco_restaurante where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateEnderecoRestaurante = async function (dadosEnderecoRestaurante) {
    let sql = `update tbl_endereco_restaurante set
                    rua = '${dadosEnderecoRestaurante.rua}',
                    cep = '${dadosEnderecoRestaurante.cep}',
                    bairro = '${dadosEnderecoRestaurante.bairro}',
                    numero = '${dadosEnderecoRestaurante.numero}',
                    complemento = '${dadosEnderecoRestaurante.complemento}'
                    id_cidade_restaurante = ${dadosEnderecoRestaurante.id_cidade_restaurante}
          
                where id = ${dadosEnderecoRestaurante.id}    
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
const selectAllEnderecoRestaurante = async function () {
    let sql = `select * from tbl_endereco_restaurante`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectEnderecoRestauranteByID = async function (id) {
    let sql = `select * from tbl_endereco_restaurante where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_endereco_restaurante order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 


module.exports = {
    insertEnderecoRestaurante,
    deleteEnderecoRestaurante,
    updateEnderecoRestaurante,
    selectAllEnderecoRestaurante,
    selectEnderecoRestauranteByID,
    selectLastId
    
}