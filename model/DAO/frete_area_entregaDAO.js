/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela frete_area_entrega no Banco de Dados
 * Data: 06/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************///Import da biblioteca do prisma client


 var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertFreteAreaEntrega = async function (dados) {
    let sql = `insert into tbl_frete_area_entrega (
        km,
        valor_entrega,
        tempo_entrega,
        raio_entrega
    ) values (
        '${dados.km}',
        '${dados.valor_entrega}',
        '${dados.tempo_entrega}',
        '${dados.raio_entrega}'

    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteFreteAreaEntrega = async function (id) {
    let sql = `delete from tbl_frete_area_entrega where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus){
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateFreteAreaEntrega = async function (dados) {
    let sql = `update tbl_frete_area_entrega set
                    km = '${dados.km}',
                    valor_entrega = '${dados.valor_entrega}',
                    tempo_entrega = '${dados.tempo_entrega}',
                    raio_entrega =  '${dados.raio_entrega}'

                where id = ${dados.id}    
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
const selectAllFreteAreaEntrega = async function () {
    let sql = `select * from tbl_frete_area_entrega`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}


const selectFreteAreaEntregaAByID = async function (id) {
    let sql = `select * from tbl_frete_area_entrega where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    }{
        return false
    }
    
        
}

const selectLastId = async function () {
    let sql = `select * from tbl_frete_area_entrega order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0){
        return rs
    } else{
        return false
    }
   
}    


module.exports = {
    insertFreteAreaEntrega,
    updateFreteAreaEntrega,
    selectAllFreteAreaEntrega,
    deleteFreteAreaEntrega,
    selectFreteAreaEntregaAByID,
    selectLastId
}