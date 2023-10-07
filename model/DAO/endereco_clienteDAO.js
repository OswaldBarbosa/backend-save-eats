/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação do endereco do cliente no Banco de Dados
 * Data: 06/09/2023
 * Autor: Julia Soares
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var {PrismaClient} = require('@prisma/client');
var prisma = new PrismaClient();


 ////////////////////////Inserts//////////////////////////
 const insertEnderecoCliente = async function (dadosEnderecoCliente) {
    let sql = `insert into tbl_endereco_cliente (
        rua,
        cep,
        bairro,
        numero,
        complemento,
        id_cidade_cliente
    ) values (
        '${dadosEnderecoCliente.rua}',
        '${dadosEnderecoCliente.cep}',
        '${dadosEnderecoCliente.bairro}',
        '${dadosEnderecoCliente.numero}',
        '${dadosEnderecoCliente.complemento}',
         ${dadosEnderecoCliente.id_cidade_cliente}


    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteEnderecoCliente = async function (id) {
    let sql = `delete from tbl_endereco_cliente where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateEnderecoCliente= async function (dadosEnderecoCliente) {
    let sql = `update tbl_endereco_cliente set
                    rua = '${dadosEnderecoCliente.rua}',
                    cep = '${dadosEnderecoCliente.cep}',
                    bairro = '${dadosEnderecoCliente.bairro}',
                    numero = '${dadosEnderecoCliente.numero}',
                    complemento = '${dadosEnderecoCliente.complemento}',
                    id_cidade_cliente = ${dadosEnderecoCliente.id_cidade_cliente}
          
                where id = ${dadosEnderecoCliente.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

///////////////////////Selects//////////////////////////
const selectAllEnderecoCliente = async function () {
    let sql = `select * from tbl_endereco_cliente`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectEnderecoClienteByID = async function (id) {
    let sql = `select   tbl_endereco_cliente.rua, tbl_endereco_cliente.cep, tbl_endereco_cliente.bairro, tbl_endereco_cliente.numero, tbl_endereco_cliente.complemento,
                        tbl_cidade_cliente.nome_cidade

                        from tbl_endereco_cliente
                            inner join tbl_cidade_cliente
                                on tbl_cidade_cliente.id = tbl_endereco_cliente.id_cidade_cliente where tbl_endereco_cliente.id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
        
}


const selectLastId = async function () {
    let sql = `select * from tbl_endereco_cliente order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
} 

module.exports = {
    insertEnderecoCliente,
    deleteEnderecoCliente,
    updateEnderecoCliente,
    selectAllEnderecoCliente,
    selectEnderecoClienteByID,
    selectLastId
}
