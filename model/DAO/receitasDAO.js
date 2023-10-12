/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela receitas  no Banco de Dados
 * Data: 05/10/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertReceita = async function (dados) {
    let sql = `insert into tbl_receitas (
        nome,
        foto,
        descricao,
        numero_porcoes,
        modo_preparo,
        id_nivel_dificuldade,
        id_tempo_preparo
    ) values (
        '${dados.nome}',
        '${dados.foto}',
        '${dados.descricao}',
        '${dados.numero_porcoes}',
        '${dados.modo_preparo}',
        ${dados.id_nivel_dificuldade},
        ${dados.id_tempo_preparo}

    )`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteReceita = async function (id) {
    let sql = `delete from tbl_receitas where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateRecetia = async function (dadosReceita) {
    let sql = `update tbl_receitas set
                   nome = '${dadosReceita.nome}',
                   foto = '${dadosReceita.foto}',
                   descricao = '${dadosReceita.descricao}',
                   numero_porcoes = '${dadosReceita.numero_porcoes}',
                   modo_preparo = '${dadosReceita.modo_preparo}',
                   id_nivel_dificuldade = ${dadosReceita.id_nivel_dificuldade},
                   id_tempo_preparo = ${dadosReceita.id_tempo_preparo}


                where id = ${dadosReceita.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }
}


const selectAllReceitas = async function () {


    //Script para trazer todas receitas
    let sql = `
    SELECT 
    r.id AS id_receita,
    r.nome AS nome_receita, 
    r.foto AS foto_receita, 
    r.descricao, 
    r.numero_porcoes, 
    r.modo_preparo,
    nd.nivel_dificuldade, 
    tp.tempo_preparo
    FROM tbl_receitas r
    INNER JOIN tbl_nivel_dificuldade nd ON r.id_nivel_dificuldade = nd.id
    INNER JOIN tbl_tempo_preparo tp ON r.id_tempo_preparo = tp.id;

    `

let rsReceita = await prisma.$queryRawUnsafe(sql)

if (rsReceita.length > 0) {
    return rsReceita;
}else {
    return false;
}

}

const selectLastId = async function () {
    let sql = `select * from tbl_receitas order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}    


const selectDetalhesReceitasByIdReceita = async function (idReceita) {

    let receita = idReceita

    //Script para trazer os detalhes de uma receita pelo id
    let sql = `SELECT 
    r.nome AS nome_receita, 
    r.foto AS foto_receita, 
    r.descricao, 
    r.numero_porcoes, 
    r.modo_preparo,
    nd.nivel_dificuldade, 
    tp.tempo_preparo,
    i.id AS id_ingredientes,
    i.nome_ingrediente AS nomes_ingredientes,
    i.quantidade AS quantidades_ingredientes,
    i.foto AS fotos_ingredientes
    FROM tbl_receitas r
    INNER JOIN tbl_nivel_dificuldade nd ON r.id_nivel_dificuldade = nd.id
    INNER JOIN tbl_tempo_preparo tp ON r.id_tempo_preparo = tp.id
    INNER JOIN tbl_receitas_ingrediente ri ON r.id = ri.id_receitas
    INNER JOIN tbl_ingrediente i ON ri.id_ingrediente = i.id
    WHERE r.id = '${receita}'

    `

let rsReceita = await prisma.$queryRawUnsafe(sql)

if (rsReceita.length > 0) {
    return rsReceita;
}else {
    return false;
}

}


const selectDetalhesReceitasByNameCategoria = async function (nameCategoria) {

    let categoria = nameCategoria

    //Script para trazer filtrar as receita pela categoria
    let sql = `SELECT 
    r.id AS id_receita,
    r.nome AS nome_receita, 
    r.foto AS foto_receita, 
    r.descricao, 
    r.numero_porcoes, 
    r.modo_preparo,
    nd.nivel_dificuldade, 
    tp.tempo_preparo,
    i.id AS id_ingrediente,
    i.nome_ingrediente AS nome_ingrediente,
    i.quantidade AS quantidade,
    i.foto AS foto_ingrediente
    FROM tbl_receitas r
    INNER JOIN tbl_nivel_dificuldade nd ON r.id_nivel_dificuldade = nd.id
    INNER JOIN tbl_tempo_preparo tp ON r.id_tempo_preparo = tp.id
    INNER JOIN tbl_receitas_ingrediente ri ON r.id = ri.id_receitas
    INNER JOIN tbl_ingrediente i ON ri.id_ingrediente = i.id
    INNER JOIN tbl_intermed_categoria_receitas icr ON r.id = icr.id_receitas
    INNER JOIN tbl_categoria_receitas c ON icr.id_categoria_receitas = c.id
    WHERE c.categoria = '${categoria}'

    `

    let rsRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsRestaurante.length > 0) {
    return rsRestaurante;
    }else {
    return false;
    }

}




module.exports = {
    insertReceita,
    selectLastId,
    selectDetalhesReceitasByIdReceita,
    selectDetalhesReceitasByNameCategoria,
    deleteReceita,
    updateRecetia,
    selectAllReceitas
}