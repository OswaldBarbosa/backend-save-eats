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
        id_endereco_restaurante,
        cnpj,
        token_recuperar_senha,
        tempo_expiracao
    ) values (
        '${dadosRestaurante.nome_proprietario}',
        '${dadosRestaurante.nome_fantasia}',
        '${dadosRestaurante.razao_social}',
        '${dadosRestaurante.email}',
        '${dadosRestaurante.senha}',
        '${dadosRestaurante.foto}',
        ${dadosRestaurante.id_categoria_restaurante},
        ${dadosRestaurante.id_endereco_restaurante},
        '${dadosRestaurante.cnpj}',
        '${dadosRestaurante.token_recuperar_senha}',
        '${dadosRestaurante.tempo_expiracao}'
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
                    id_endereco_restaurante = ${dadosRestaurante.id_endereco_restaurante},
                    cnpj = '${dadosRestaurante.cnpj}',
                    token_recuperacao_senha = '${dadosRestaurante.token_recuperacao_senha}',
                    tempo_expiracao = '${dadosRestaurante.tempo_expiracao}'

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
    let sql = `
    SELECT 
    r.id,
    r.nome_proprietario,
    r.nome_fantasia,
    r.razao_social,
    r.email,
    r.senha,
    r.foto,
    r.cnpj,
    r.token_recuperar_senha,
    r.tempo_expiracao,
    r.id_categoria_restaurante,
    c.nome_categoria AS nome_categoria_restaurante,
    r.id_endereco_restaurante
    FROM
        tbl_restaurante r
    JOIN
    tbl_categoria_restaurante c ON r.id_categoria_restaurante = c.id;

    `
    let rsRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsRestaurante.length > 0) {
        return rsRestaurante;
    }
    else {
        return false;
    }
}

const selectRestauranteByID = async function (id) {
    let sql = `select * from vwRestauranteCategoriaTelefoneEndereco where id = ${id}`

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

//Funcao pra verificar se o email que for inserido no cadastro ja existe no banco
const verificarEmailExistenteRestaurante = async function (email) {
    let sql = `SELECT  * FROM tbl_restaurante WHERE email = '${email}';`

    let rsEmailRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsEmailRestaurante.length > 0) {
        return rsEmailRestaurante;
    }
    else {
        return false;
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


const selectByNameRestaurante = async function (name) {

    let nameRestaurante = name

    //Script para buscar um restaurante filtrando pelo nome
    let sql = `select * from tbl_restaurante where nome_fantasia like '%${nameRestaurante}%'`;

    let rsRestaurante = await prisma.$queryRawUnsafe(sql)
    if (rsRestaurante.length > 0) {
        return rsRestaurante
    } else {
        return false;
    }
}

//verifica se o nome fantasia do restaurante inserido existe no banco de dados
const verificarNomeFantasiaRestauranteExistente = async function (nomeRestaurante){

    let sql = `SELECT  * FROM tbl_restaurante WHERE nome_fantasia = '${nomeRestaurante}';`

    let rsNomeRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsNomeRestaurante.length > 0) {
        return rsNomeRestaurante;
    }
    else {
        return false;
    }
}
  
const selectCategoriasDoRestaurantePeloNomeFantasia = async function (name) {

    let nameRestaurante = name;

    // Script para buscar as CATEGORIAS de um restaurante filtrando pelo nome fantasia
    let sql = `SELECT r.nome_fantasia, GROUP_CONCAT(DISTINCT cp.categoria_produto) as categorias
    FROM tbl_produto AS p
    INNER JOIN tbl_categoria_produto AS cp ON p.id_categoria_produto = cp.id
    INNER JOIN tbl_restaurante AS r ON p.id_restaurante = r.id
    WHERE r.nome_fantasia = '${nameRestaurante}'
    GROUP BY r.nome_fantasia;`; 

    let rsCategoriasRestaurante = await prisma.$queryRawUnsafe(sql);

    if (rsCategoriasRestaurante.length > 0) {

        const categorias = rsCategoriasRestaurante[0].categorias.split(','); 

        return categorias;

    } else {

        return false;

    }
}


const selectProdutosDoRestaurantePeloNomeFantasia = async function (name) {
    let nameRestaurante = name;

    // Script para buscar os PRODUTOS de um restaurante filtrando pelo nome fantasia
    let sql = `SELECT produto.*
    FROM tbl_produto AS produto
    INNER JOIN tbl_restaurante AS restaurante ON produto.id_restaurante = restaurante.id
    WHERE restaurante.nome_fantasia = '${nameRestaurante}'`; 

    let rsProdutosRestaurante = await prisma.$queryRawUnsafe(sql);

    if (rsProdutosRestaurante.length > 0) {
        return rsProdutosRestaurante
    } else {
        return false;
    }
}


const selectProdutoByIDRestaurante = async function (nomeProduto,idRestaurante) {

    let idDoRestaurante = idRestaurante

    let nomeDoProduto = nomeProduto

    // Script para Filtrar/Buscar os produtos do restaurante especifico pelo id do restaurante
    let sql = ` SELECT produto.*
                FROM tbl_produto AS produto
                WHERE produto.id_restaurante = '${idDoRestaurante}'
                AND produto.nome LIKE '%${nomeDoProduto}%'`


    let rsCProdutosRestaurante = await prisma.$queryRawUnsafe(sql);

    if (rsCProdutosRestaurante.length > 0) {
        return rsCProdutosRestaurante
    } else {
        return false;
    }
}


const selectProdutosPausadosDeUmRestaurante = async function (restaurante) {

        let idRestaurante = restaurante

        //Script para trazer os produtos pausados de um restaurante especifico
        let sql = `
        SELECT
        p.id AS produto_id,
        p.nome AS nome_produto,
        p.descricao AS descricao_produto,
        c.categoria_produto AS categoria,
        s.status_produto AS status
            FROM
        tbl_produto AS p
            INNER JOIN
        tbl_status_produto AS s ON p.id_status_produto = s.id
            INNER JOIN
        tbl_categoria_produto AS c ON p.id_categoria_produto = c.id
            INNER JOIN
        tbl_restaurante AS r ON p.id_restaurante = r.id

        WHERE
        s.status_produto = 'pausado'
        AND r.id = '${idRestaurante}';
    `

    let rsRestaurante = await prisma.$queryRawUnsafe(sql)

    if (rsRestaurante.length > 0) {
        return rsRestaurante;
    }
    else {
        return false;
    }
}


const selectPedidosCanceladosDeUmRestaurante = async function (restaurante) {

    let idRestaurante = restaurante

    //Script para trazer os produtos pausados de um restaurante especifico
    let sql = `
    SELECT
    p.id AS pedido_id,
    p.numero_pedido,
    p.horario,
    p.data_pedido,
    p.previsao_entrega,
    p.valor_total,
    s.status_pedido,
    r.nome_fantasia AS nome_restaurante
    FROM
    tbl_pedido AS p
    INNER JOIN
    tbl_status_pedido AS s ON p.id_status_pedido = s.id
    INNER JOIN
    tbl_restaurante AS r ON p.id_restaurante = r.id
    WHERE
    s.status_pedido = 'cancelado'
    AND r.id = '${idRestaurante}';

`

let rsRestaurante = await prisma.$queryRawUnsafe(sql)

if (rsRestaurante.length > 0) {
    return rsRestaurante;
}
else {
    return false;
}
}

//traz as formas de pagamento de um restaurante pelo id
const selectFormaPagamentoByIDRestaurante = async function (idRestaurante) {

    let idDoRestaurante = idRestaurante

    // Script para Filtrar/Buscar as formas de pagamento do restaurante especifico pelo id do restaurante
    let sql = `

    SELECT forma_pagamento.*

    FROM tbl_forma_pagamento AS forma_pagamento

    INNER JOIN tbl_restaurante_forma_pagamento AS restaurante_forma_pagamento ON forma_pagamento.id = restaurante_forma_pagamento.id_forma_pagamento

    WHERE restaurante_forma_pagamento.id_restaurante = '${idDoRestaurante}';

    `


    let rsFormaPagamento = await prisma.$queryRawUnsafe(sql);

    if (rsFormaPagamento.length > 0) {
        return rsFormaPagamento
    } else {
        return false;
    }
}

//traz as areas entrega/frete  de um restaurante pelo id
const selectFreteAreaEntregaByIDRestaurante = async function (idRestaurante) {

    let idDoRestaurante = idRestaurante

    // Script para Filtrar/Buscar as areas de entrega/frete do restaurante especifico pelo id do restaurante
    let sql = `

    SELECT restaurante.id AS restaurante_id, frete_area_entrega.id AS area_entrega_id, frete_area_entrega.km, frete_area_entrega.valor_entrega, frete_area_entrega.tempo_entrega, frete_area_entrega.raio_entrega

    FROM tbl_restaurante restaurante

    INNER JOIN tbl_restaurante_frete_area_entrega restaurante_frete ON restaurante.id = restaurante_frete.id_restaurante

    INNER JOIN tbl_frete_area_entrega frete_area_entrega ON restaurante_frete.id_frete_area_entrega = frete_area_entrega.id

    WHERE restaurante.id ='${idDoRestaurante}';

    `


    let rsFreteAreaEntregaRestaurante = await prisma.$queryRawUnsafe(sql);

    if (rsFreteAreaEntregaRestaurante.length > 0) {
        return rsFreteAreaEntregaRestaurante
    } else {
        return false;
    }
}

const selectRaioEntregaByIdRestaurant = async (idRestaurante) => {
    let idDoRestaurante = idRestaurante

    let sql = `select raio_entrega from tbl_frete_area_entrega where id = ${idDoRestaurante};`

    let rsFreteAreaEntregaRestaurante = await prisma.$queryRawUnsafe(sql);

    if (rsFreteAreaEntregaRestaurante.length > 0) {
        return rsFreteAreaEntregaRestaurante
    } else {
        return false;
    }
}

const updateRaioEntregaByIdRestaurant = async (dadosRestaurante) => {
    let sql = `UPDATE tbl_frete_area_entrega AS frete_area_entrega
     INNER JOIN tbl_restaurante_frete_area_entrega AS restaurante_frete_area_entrega
         ON frete_area_entrega.id = restaurante_frete_area_entrega.id_frete_area_entrega
    SET frete_area_entrega.raio_entrega = ${dadosRestaurante.raio_entrega}
    WHERE restaurante_frete_area_entrega.id_restaurante = ${dadosRestaurante.id_restaurante};`;

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

const selectDiaHorarioFuncionamentoByIdRestaurante = async (idRestaurante) => {

    let idDoRestaurante = idRestaurante

    let sql = `    SELECT
    ds.dia_semana AS dia_da_semana,
    TIME_FORMAT(hf.horario_inicio, '%H:%i') AS horario_inicio,
    TIME_FORMAT(hf.horario_final, '%H:%i') AS horario_final
    FROM
    tbl_restaurante_funcionamento_dia_semana rfd
    INNER JOIN
    tbl_dia_semana ds ON rfd.id_dia_semana = ds.id
    INNER JOIN
    tbl_horario_funcionamento hf ON rfd.id_horario_funcionamento = hf.id
    WHERE
    rfd.id_restaurante =  ${idDoRestaurante};`

    let rsDiaHorarioFuncionamento = await prisma.$queryRawUnsafe(sql);

    if (rsDiaHorarioFuncionamento.length > 0) {
        return rsDiaHorarioFuncionamento
    } else {
        return false;
    }
}


const selectAvaliacoesByIdRestaurante = async (idRestaurante) => {

    let idDoRestaurante = idRestaurante

    let sql = `

    SELECT
    avaliacao.id AS avaliacao_id,
    avaliacao.quantidade_estrela,
    avaliacao.descricao AS avaliacao_descricao,
    DATE_FORMAT(avaliacao.data_avaliacao, '%d/%m/%Y') AS data_avaliacao,
    recomendacao.id AS recomendacao_id,
    recomendacao.recomendacao,
    cliente.nome AS nome_cliente,
    cliente.foto AS foto_cliente

    FROM

    tbl_avaliacao avaliacao
    INNER JOIN
    tbl_avaliacao_recomendacao AR ON avaliacao.id = AR.id_avaliacao

    INNER JOIN
    tbl_recomendacao recomendacao ON AR.id_recomendacao = recomendacao.id

    INNER JOIN
    tbl_cliente cliente ON avaliacao.id_cliente = cliente.id

    INNER JOIN
    tbl_restaurante restaurante ON avaliacao.id_restaurante = restaurante.id

    WHERE avaliacao.id_restaurante =  ${idDoRestaurante};`

    let rsAvaliacoesRestaurante = await prisma.$queryRawUnsafe(sql);

    if (rsAvaliacoesRestaurante.length > 0) {
        return rsAvaliacoesRestaurante
    } else {
        return false;
    }
}


module.exports = {
    insertRestaurante,
    deleteRestaurante,
    selectRestauranteByID,
    updateRestaurante,
    selectAllRestaurante,
    selectRestauranteByEmailPassword,
    verificarEmailExistenteRestaurante,
    selectLastId,
    selectByNameRestaurante,
    verificarNomeFantasiaRestauranteExistente,
    selectCategoriasDoRestaurantePeloNomeFantasia,
    selectProdutosDoRestaurantePeloNomeFantasia,
    selectProdutoByIDRestaurante,
    selectProdutosPausadosDeUmRestaurante,
    selectPedidosCanceladosDeUmRestaurante,
    selectFormaPagamentoByIDRestaurante,
    selectFreteAreaEntregaByIDRestaurante,
    selectRaioEntregaByIdRestaurant,
    updateRaioEntregaByIdRestaurant,
    selectDiaHorarioFuncionamentoByIdRestaurante,
    selectAvaliacoesByIdRestaurante

}