/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da CATEGORIA dos restaurantes no Banco de Dados
 * Data: 31/08/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

 var { PrismaClient } = require('@prisma/client')

 var prisma = new PrismaClient()

 ////////////////////////Inserts//////////////////////////
const insertCategoriaRestaurante = async function (dadosCategoria) {
    let sql = `insert into tbl_categoria_restaurante (
        nome_categoria
    ) values (
        '${dadosCategoria.nome_categoria}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteCategoriaRestaurante = async function (id) {
    let sql = `delete from tbl_categoria_restaurante where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}
 
///////////////////////Updates//////////////////////////
const updateCategoriaRestaurante = async function (dadosCategoria) {
    let sql = `update tbl_categoria_restaurante set  

                    nome_categoria = '${dadosCategoria.nome_categoria}'

                    where id = ${dadosCategoria.id}    
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
const selectAllCategoriaRestaurante = async function () {
    let sql = `select * from tbl_categoria_restaurante`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectCategoriaRestauranteByID = async function (id) {
    let sql = `select * from tbl_categoria_restaurante where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_categoria_restaurante order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}     

//Parei aqui bora arrumar
const selectRestauranteByCategoria = async function (categoria) {

    let nameCategoria = categoria;
    console.log("Valor da categoria:", categoria);

    // Script para buscar os RESTAURANTES de uma categoria especifica
    let sql = `SELECT restaurante.*
    FROM tbl_restaurante restaurante
    INNER JOIN tbl_categoria_restaurante categoria_restaurante ON restaurante.id_categoria_restaurante = categoria_restaurante.id
    WHERE categoria_restaurante.nome_categoria = '${nameCategoria}'`; 

    let rsRestaurantesDaCategoria = await prisma.$queryRawUnsafe(sql);

    if (rsRestaurantesDaCategoria.length > 0) {
        return rsRestaurantesDaCategoria;
    }
    else {
        return false;
    }
}


module.exports = {
    insertCategoriaRestaurante,
    deleteCategoriaRestaurante,
    updateCategoriaRestaurante,
    selectAllCategoriaRestaurante,
    selectCategoriaRestauranteByID,
    selectLastId,
    selectRestauranteByCategoria
}