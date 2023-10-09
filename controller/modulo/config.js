/***************************************************************************************************************
 * Objetivo: Arquivo responsável por padronizar as mensagens de ERRO, SUCESSO, FUNCOES, VARIAVEIS para o projeto SAVE EATS
 * Data: 30/09/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 **************************************************************************************************************/

//Mensagens de Erro
const ERROR_REQUIRED_FIELDS = {status: 400, message: 'Campos obrigatórios não foram preenchidos'}

const ERROR_INTERNAL_SERVER = {status: 500, message: 'Devido a um erro interno do servidor, não foi possivel processar a requisição'}

const ERROR_INVALID_ID = {status: 400, message: 'O ID informado na requisição não é valido, ou não foi encaminhado'}

const ERROR_NOT_FOUND_ID = {status: 400, message: 'O ID informado na requisição não existe, ou não pode ser encontrado'}

const ERROR_NOT_FOUND = {status: 404, message: 'Nenhum item foi encontrado na requisição'}

const ERROR_INVALID_EMAIL_PASSWORD = {status: 404, message: 'Email ou senha inválidos.'}

const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O tipo de mídia Content-Type da solicitação não é compativel com o servidor. Tipo Aceito: [application/json]'}

const ERROR_INVALID_TOKEN = {status: 401, message: 'Token não autorizado,verifique o tempo de expiração.'}

const ERROR_EMAIL_ALREADY_EXISTS = {status: 401, message: 'Esse e-mail já está vinculado a uma conta.'}

const ERROR_STATUS_PRODUCT_NOT_FOUND = {status: 401, message: 'O status do produto inserido não existe em nosso banco de dados.'}

const ERROR_CATEGORY_PRODUCT_NOT_FOUND = {status: 401, message: 'A categoria-produto inserida não existe em nosso banco de dados.'}

const ERROR_RESTAURANT_NOT_FOUND = {status: 401, message: 'O nome fantasia inserido não existe no banco de dados.'}

const ERROR_FORMA_PAGAMENTO_NOT_FOUND = {status: 401, message: 'O id da forma de pagamento inserido não existe no banco de dados.'}

//Mensagens de Sucesso
const SUCESS_CREATED_ITEM = {status: 201, message: 'Item criado com sucesso'}

const SUCESS_UPDATED_ITEM = {status: 200, message: 'Item atualizado com sucesso'}

const SUCESS_DELETED_ITEM = {status: 200, message: 'Item deletado com sucesso'}

const SUCESS_REQUEST = {status: 200, message: 'requisição bem-sucedida'}


module.exports = {
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_NOT_FOUND_ID,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    SUCESS_UPDATED_ITEM,
    SUCESS_DELETED_ITEM,
    SUCESS_REQUEST,
    ERROR_INVALID_EMAIL_PASSWORD,
    ERROR_INVALID_TOKEN,
    ERROR_EMAIL_ALREADY_EXISTS,
    ERROR_STATUS_PRODUCT_NOT_FOUND,
    ERROR_CATEGORY_PRODUCT_NOT_FOUND,
    ERROR_RESTAURANT_NOT_FOUND,
    ERROR_FORMA_PAGAMENTO_NOT_FOUND
}