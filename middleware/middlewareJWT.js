/***************************************************************************************************************************************************
 * Objetivo: Implementacao do JWT do projeto
 *  Data:  12/10/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/


//import da biblioteca
const jwt = require ('jsonwebtoken');

//Chave secreta pra criacao do JWT
const SECRET = 'alb2c3'

//Tempo para validar o token do JWT (segundos)
const EXPIRES = 60;


//Criacao do JWT (retorna um TOKEN)
const createJWT = async function (payLoad){

    //Gera o token
    //payload - identificacao do usuario autenticado
    //SECRET - chave secreta
    //expiresIn - expiracao do token
    const token = jwt.sign({UserID : payLoad} , SECRET , {expiresIn: EXPIRES})

    return token;
};



//Validacao de autencididade do JWT (recebe o TOKEN para validacao)
const validadeJWT = async function (token){

    let status;

    //Valida a autenticidade do token
    jwt.verify(token,SECRET,async function (err,decode){
        console.log(token);

        if (err) 
            status = false;
        else
            status = true;
        return status;
       

    });
}

module.exports = {
    createJWT,
    validadeJWT
}


