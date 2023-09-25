/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados do produto no Banco de Dados
 * Data: 06/09/2023
 * Autor: Oswaldo Barbosa
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

//selecionar todos produtos
const selectAllProdutos = async () => {

    let sql = `select   tbl_produto.id, tbl_produto.nome, tbl_produto.descricao, tbl_produto.imagem, tbl_produto.preco,
                        tbl_categoria_produto.categoria_produto,
                        tbl_status_produto.status_produto,
                        tbl_restaurante.nome_fantasia
                           
                        from tbl_produto
                            inner join tbl_categoria_produto
                                on tbl_categoria_produto.id = tbl_produto.id_categoria_produto
                            inner join tbl_status_produto
                                on tbl_status_produto.id = tbl_produto.id_status_produto
                            inner join tbl_restaurante
                                on tbl_restaurante.id = tbl_produto.id_restaurante`

    let resultProduto = await prisma.$queryRawUnsafe(sql)

    if (resultProduto.length > 0) {
        return resultProduto
    } else {
        return false
    }

}

//selecionar produto pelo id
const selectProdutoByID = async (idProduto) => {

    let sql = `select   tbl_produto.nome, tbl_produto.descricao, tbl_produto.imagem, tbl_produto.preco,
                        tbl_categoria_produto.categoria_produto,
                        tbl_status_produto.status_produto,
                        tbl_restaurante.nome_fantasia
       
                        from tbl_produto
                            inner join tbl_categoria_produto
                                on tbl_categoria_produto.id = tbl_produto.id_categoria_produto
                            inner join tbl_status_produto
                                on tbl_status_produto.id = tbl_produto.id_status_produto
                            inner join tbl_restaurante
                                on tbl_restaurante.id = tbl_produto.id_restaurante where tbl_produto.id = ${idProduto}`

    let resultProduto = await prisma.$queryRawUnsafe(sql)

    if (resultProduto.length > 0) {
        return resultProduto
    } else {
        return false
    }

}

//selecionar o ultimo id do produto inserido
const selectLastId = async () => {

    let sql = `select * from tbl_produto order by id desc limit 1`

    let resultProduto = await prisma.$queryRawUnsafe(sql)

    if (resultProduto.length > 0) {
        return resultProduto
    } else {
        return false
    }

}

//inserir um produto
const insertProduto = async (dadosProdutos) => {

    let sql = `insert into tbl_produto (
        nome,
        descricao,
        imagem,
        preco,
        id_status_produto,
        id_categoria_produto,
        id_restaurante
    )   values (
        '${dadosProdutos.nome}',
        '${dadosProdutos.descricao}',
        '${dadosProdutos.imagem}',
        '${dadosProdutos.preco}',
         ${dadosProdutos.id_status_produto},
         ${dadosProdutos.id_categoria_produto},
         ${dadosProdutos.id_restaurante}
    )`

    let resultProduto = await prisma.$executeRawUnsafe(sql)

    if (resultProduto) {
        return true
    } else {
        return false
    }

}

//atualizaer um produto
const updateProduto = async (dadosProdutos) => {
    
    let sql = `update tbl_produto set
               nome = '${dadosProdutos.nome}',
               descricao = '${dadosProdutos.descricao}',
               imagem = '${dadosProdutos.imagem}',
               preco = '${dadosProdutos.preco}',
               status_produto = '${dadosProdutos.status_produto}',
               categoria_produto = '${dadosProdutos.categoria_produto}',
               nome_fantasia = '${dadosProdutos.nome_fantasia}'

               where id = ${dadosProdutos.id}
               `

    let resultProduto = await prisma.$executeRawUnsafe(sql)           

    if (resultProduto) {
        return true
    } else {
        return false
    }

}

const deleteProduto = async (idProduto) => {

    let sql = `delete from tbl_produto where id = ${idProduto}`

    let resultProduto = await prisma.$executeRawUnsafe(sql)

    if (resultProduto) {
        return true
    } else {
        return false
    }

}





module.exports = {
    selectAllProdutos,
    selectProdutoByID,
    selectLastId,
    updateProduto,
    deleteProduto
}