/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de cidade restaurante no Banco de Dados
 * Data: 05/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertCidadeRestaurante = async function (dadosCidadeRestaurante) {
    let sql = `insert into tbl_cidade_restaurante (
        nome_cidade,
        id_estado_restaurante
    ) values (
        '${dadosCidadeRestaurante.nome_cidade}',
        ${dadosCidadeRestaurante.id_estado_restaurante}

    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteCidadeRestaurante = async function (id) {
    let sql = `delete from tbl_cidade_restaurante where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateCidadeRestaurante = async function (dadosCidadeRestaurante) {
    let sql = `UPDATE tbl_cidade_restaurante SET
                    nome_cidade = '${dadosCidadeRestaurante.nome_cidade}',
                    id_estado_restaurante = ${dadosCidadeRestaurante.id_estado_restaurante}
                    WHERE id = ${dadosCidadeRestaurante.id};`;

    try {
        // Executa o script SQL no BD
        let resultStatus = await prisma.$executeRawUnsafe(sql);

        if (resultStatus) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Erro ao executar a consulta SQL:", error);
        return false;
    }
}

///////////////////////Selects//////////////////////////
const selectAllCidadeRestaurante = async function () {
    let sql = `select * from tbl_cidade_restaurante`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectCidadeRestauranteByID = async function (id) {
    let sql = `select * from tbl_cidade_restaurante where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_cidade_restaurante order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}         



module.exports = {
    insertCidadeRestaurante,
    deleteCidadeRestaurante,
    selectCidadeRestauranteByID,
    updateCidadeRestaurante,
    selectAllCidadeRestaurante,
    selectLastId
}