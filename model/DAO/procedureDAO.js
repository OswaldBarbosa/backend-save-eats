/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação das procedures no banco de dados
 * Data: 14/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/
 
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


const proceduresRestauranteCadastro = async function (dadosProcedures) {
    let call = `
    CALL procInsertRestaurante(
        '${dadosProcedures.nome_categoria}',
        '${dadosProcedures.nome_estado}',
        '${dadosProcedures.nome_cidade}',
        '${dadosProcedures.rua}',
        '${dadosProcedures.cep}',
        '${dadosProcedures.bairro}',
         '${dadosProcedures.numero}',
        '${dadosProcedures.complemento}',
        '${dadosProcedures.nome_proprietario}',
        '${dadosProcedures.nome_fantasia}',
        '${dadosProcedures.razao_social}',
        '${dadosProcedures.email}',
        '${dadosProcedures.senha}',
        '${dadosProcedures.foto}',
        '${dadosProcedures.cnpj}',
        '${dadosProcedures.numero_telefone}'
    );
    
`

    let resultStatus = await prisma.$executeRawUnsafe(call)
    console.log(resultStatus);

    if(resultStatus){
        return true
    } else {
        return false
    }
}

module.exports = {
    proceduresRestauranteCadastro
}