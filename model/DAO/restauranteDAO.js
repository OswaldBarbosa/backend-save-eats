/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados do RESTAURANTE no Banco de Dados
 * Data: 31/08/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertRestaurante = async function (dadosRestaurante) {
    let sql = `insert into tbl_restaurante (
        nome_proprietario,
        nome_fantasia,
        razao_social,
        email,
        senha,
        foto,
        id_categoria_restaurante,
        id_endereco_restaurante
    ) values (
        '${dadosRestaurante.nome_proprietario}',
        '${dadosRestaurante.nome_fantasia}',
        '${dadosRestaurante.razao_social}',
        '${dadosRestaurante.email}',
        '${dadosRestaurante.senha}',
        '${dadosRestaurante.foto}',
        ${dadosRestaurante.id_categoria_restaurante},
        ${dadosRestaurante.id_endereco_restaurante}
    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteRestaurante = async function (id) {
    let sql = `delete from tbl_restaurante where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateRestaurante = async function (dadosRestaurante) {
    let sql = `update tbl_restaurante set
                    nome_proprietario = '${dadosRestaurante.nome_proprietario}',
                    nome_fantasia = '${dadosRestaurante.nome_fantasia}',
                    razao_social = '${dadosRestaurante.razao_social}',
                    email = '${dadosRestaurante.email}',
                    senha = '${dadosRestaurante.senha}',
                    foto = '${dadosRestaurante.foto}',
                    id_categoria_restaurante = ${dadosRestaurante.id_categoria_restaurante},
                    id_endereco_restaurante = ${dadosRestaurante.id_endereco_restaurante}

                where id = ${dadosRestaurante.id}    
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

const selectAllRestaurante = async function () {
    let sql = `select * from tbl_restaurante`

    let rsRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsRestaurante.length > 0) {
        return rsRestaurante;
    }
    else {
        return false;
    }
}

const selectRestauranteByID = async function (id) {
    let sql = `select * from tbl_restaurante where id = ${id}`

    let rsRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsRestaurante.length > 0){
        return rsRestaurante
    } else{
        return false
    }
        
}

const selectRestauranteByEmailPassword = async function(email, password){
    let sql = `select * from tbl_restaurante where email = '${email}' and senha = '${password}';`

    let rsRestaurante = await prisma.$queryRawUnsafe(sql);

    if (rsRestaurante.length > 0){
        return rsRestaurante
    } else{
        return false
    }
}


const selectLastId = async function () {
    let sql = `select * from tbl_restaurante order by id desc limit 1;`

    let rsRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsRestaurante.length > 0){
        return rsRestaurante
    } else{
        return false
    }
   
}    


module.exports = {
    insertRestaurante,
    deleteRestaurante,
    selectRestauranteByID,
    updateRestaurante,
    selectAllRestaurante,
    selectRestauranteByEmailPassword,
    selectLastId
}