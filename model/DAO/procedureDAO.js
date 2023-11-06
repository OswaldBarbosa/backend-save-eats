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

//Funcao para o restaurante aceitar formas de pagamento existentes no banco de dados e
//salvar na tabela intermediaria - PROCEDURE
//TALVEZ NAO IREMOS MAIS USAR,MAS VOU DEIXAR AQUI
const procedureInsertRestauranteFormaPagamento = async function (dadosProcedures) {

    let call = `
    CALL AdicionarFormaPagamentoRestaurante(
        ${dadosProcedures.restaurante_id},
        ${dadosProcedures.forma_pagamento_id}    
    );    
`

    let resultStatus = await prisma.$executeRawUnsafe(call)

    if(resultStatus){
        return true
    } else {
        return false
    }
}

//Funcao para o restaurante adicionar suas areas de entregas - PROCEDURE
const procedureInsertRestauranteAreaEntrega = async function (dadosProcedures) {

    let call = `
    CALL AdicionarAreaEntregaRestaurante(

        ${dadosProcedures.restaurante_id},
        '${dadosProcedures.km}',
        '${dadosProcedures.valor_entrega}',
        '${dadosProcedures.tempo_entrega}',
        '${dadosProcedures.raio_entrega}'     

    );    
`
    let resultStatus = await prisma.$executeRawUnsafe(call)

    if(resultStatus){

        return true
    } else {
        return false
    }
}


//Funcao para o restaurante editar suas areas de entregas - PROCEDURE
const procedureUpdateRestauranteAreaEntrega = async function (dadosProcedures) {

    let call = `
    CALL EditarAreaEntregaRestaurante(

        ${dadosProcedures.restaurante_id},
        ${dadosProcedures.area_entrega_id},
        '${dadosProcedures.novo_km}',
        '${dadosProcedures.novo_valor_entrega}',
        '${dadosProcedures.novo_tempo_entrega}',
        '${dadosProcedures.novo_raio_entrega}'     

    );    
`
    let resultStatus = await prisma.$executeRawUnsafe(call)

    if(resultStatus){

        return true
    } else {
        return false
    }
}


//Funcao pra atualizar um restaurante (WEB) - PROCEDURE
const procedureUpdateDadosRestaurante = async function (dadosProcedures) {
    let call = `
    CALL atualizaDadosRestaurante(
        ${dadosProcedures.id_restaurante},
        '${dadosProcedures.nome_proprietario}',
        '${dadosProcedures.nome_fantasia}',
        '${dadosProcedures.razao_social}',
        '${dadosProcedures.email}',
        '${dadosProcedures.senha}',
        '${dadosProcedures.foto}',
        '${dadosProcedures.cnpj}',
        '${dadosProcedures.categoria_restaurante}',
        '${dadosProcedures.numero_telefone}',
        ${dadosProcedures.id_endereco_restaurante},
        '${dadosProcedures.rua}',
        '${dadosProcedures.cep}',
        '${dadosProcedures.bairro}',
        '${dadosProcedures.numero}',
        '${dadosProcedures.complemento}',
        '${dadosProcedures.nome_cidade}',
        '${dadosProcedures.nome_estado}'
    );
`
    let resultStatus = await prisma.$executeRawUnsafe(call)
    if(resultStatus){
        return true
    } else {
        return false
    }
}



//Funcao para um cliente realizar um pedido - PROCEDURE
 const procedureClienteInsertPedido = async function (dadosProcedures) {
     let call = `

    CALL InserirPedidoComProdutosValorTotalComFrete(
         @novo_numero_pedido,
         ${dadosProcedures.id_status_pedido},
         ${dadosProcedures.id_restaurante_forma_pagamento},
         ${dadosProcedures.id_restaurante_frete_area_entrega},
         ${dadosProcedures.id_cliente},
         ${dadosProcedures.id_restaurante},
         ${dadosProcedures.produto_id1},
         ${dadosProcedures.produto_id2}
     );
 `

        
     let resultStatus = await prisma.$executeRawUnsafe(call)

     if (resultStatus) {
         return true;
     } else {
         return false;
     }
 }


//Funcao para o restaurante adicionar seus dias/horarios funcionamentos  - PROCEDURE
const procedureRestauranteInsertDiasHorariosFuncionamento = async function (dadosProcedures) {

    let call = `
    CALL adicionar_horario_funcionamento_restaurante(

        ${dadosProcedures.restaurante_id},
        '${dadosProcedures.horario_inicio}',
        '${dadosProcedures.horario_final}',
        '${dadosProcedures.dias_semana}' 

    );    
`
    let resultStatus = await prisma.$executeRawUnsafe(call)

    if(resultStatus){
        return true
    } else {
        return false
    }
}


//Funcao para o restaurante editar os horarios de um dia da semana - PROCEDURE
const procedureUpdateHorariosFuncionamentoDoRestaurante = async function (dadosProcedures) {

    let call = `
    CALL restaurante_editar_horario_funcionamento(

        ${dadosProcedures.restaurante_id},
        ${dadosProcedures.dia_semana_id},
        '${dadosProcedures.horario_inicio}',
        '${dadosProcedures.horario_final}'

    );    
`
    let resultStatus = await prisma.$executeRawUnsafe(call)

    if(resultStatus){

        return true
    } else {
        return false
    }
}

//Funcao para o cliente avaliar um restaurante  - PROCEDURE
const procedureClienteAvaliarRestaurante = async function (dadosProcedures) {
    try {
        let call = `
        CALL AvaliarRestaurante(
            ${dadosProcedures.cliente_id},
            ${dadosProcedures.restaurante_id},
            ${dadosProcedures.quantidade_estrela},
            '${dadosProcedures.descricao}',
            '${dadosProcedures.data_avaliacao}',
            ${dadosProcedures.recomendacao_id} 
        );    
        `;

        await prisma.$executeRawUnsafe(call);
        // chamada da procedure foi bem-sucedida
        return true; 
    } catch (error) {
        console.error('Erro ao chamar a procedure:', error);
        return false; 
    }
}


 const selectLastId = async function () {
    let sql = `select * from tbl_pedido order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }
}   

module.exports = {
    proceduresRestauranteCadastro,
    procedureInsertCadastroCliente,
    procedureInsertProduto,
    procedureUpdateProduto,
    procedureInsertRestauranteFormaPagamento,
    procedureInsertRestauranteAreaEntrega,
    procedureUpdateRestauranteAreaEntrega,
    procedureUpdateDadosRestaurante,
    procedureClienteInsertPedido,
    procedureRestauranteInsertDiasHorariosFuncionamento,
    procedureUpdateHorariosFuncionamentoDoRestaurante,
    procedureClienteAvaliarRestaurante,
    selectLastId
}