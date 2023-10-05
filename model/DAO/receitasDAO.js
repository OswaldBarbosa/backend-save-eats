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

module.exports = {
    insertReceita
}