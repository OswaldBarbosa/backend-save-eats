/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação das procedures no banco de dados
 * Data: 14/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/
 
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

//Funcao pra cadastrar um restaurante (WEB) - PROCEDURE
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


    if(resultStatus){
        return true
    } else {
        return false
    }
}

//Funcao para cadastro um cliente (MOBILE) - PROCEDURE
const procedureInsertCadastroCliente = async function (dadosProcedures) {

    let call = `
    CALL procIntermedEnderecoCliente(
        '${dadosProcedures.nome}',
        '${dadosProcedures.email}',
        '${dadosProcedures.senha}',
        '${dadosProcedures.cpf}',
        '${dadosProcedures.foto}',
        '${dadosProcedures.telefone}',
        '${dadosProcedures.nome_estado}',
        '${dadosProcedures.nome_cidade}',
        '${dadosProcedures.cep}',
        '${dadosProcedures.rua}',
        '${dadosProcedures.bairro}',
        '${dadosProcedures.numero}',
        '${dadosProcedures.complemento}'
        
    );
    
`

    let resultStatus = await prisma.$executeRawUnsafe(call)

    if(resultStatus){
        return true
    } else {
        return false
    }
}

//Funcao para cadastrar um produto (na tela de cardapio do restaurante) - PROCEDURE
const procedureInsertProduto = async function (dadosProcedures) {

    let call = `
    CALL InsertProduto(
        '${dadosProcedures.nome}',
        '${dadosProcedures.descricao}',
        '${dadosProcedures.imagem}',
        '${dadosProcedures.preco}',
        '${dadosProcedures.status_produto}',
        '${dadosProcedures.categoria_produto}',
        '${dadosProcedures.nome_fantasia}'     
    );   
`
    let resultStatus = await prisma.$executeRawUnsafe(call)

    if(resultStatus){
        return true
    } else {
        return false
    }
}

//Funcao para atualizar um produto (na tela de cardapio do restaurante) - PROCEDURE
const procedureUpdateProduto = async function (dadosProcedures) {
    let call = `
    CALL UpdateProduto(
        '${dadosProcedures.id}', 
        '${dadosProcedures.nome}',
        '${dadosProcedures.descricao}',
        '${dadosProcedures.imagem}',
        '${dadosProcedures.preco}',
        '${dadosProcedures.status_produto}',
        '${dadosProcedures.categoria_produto}',
        '${dadosProcedures.nome_fantasia}'
    );
    `
    
    let resultStatus = await prisma.$executeRawUnsafe(call)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}





module.exports = {
    proceduresRestauranteCadastro,
    procedureInsertCadastroCliente,
    procedureInsertProduto,
    procedureUpdateProduto
    
}