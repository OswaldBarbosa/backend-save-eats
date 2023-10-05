
/* ***************************************************************************************************************************************************
 * Objetivo : API para integração da API de pagamento do mercado pago.
 * Autor : Caroline Portela
 * Data 05/09/2023
 * Versão : 1.0 
 *************************************************************************************************************************************************** */

// SDK do Mercado Pago
import MercadoPago from 'mercadopago';

const { MercadoPago } = require('mercadopago');

// Configure as credenciais do Mercado Pago
MercadoPago.configure({
  access_token: 'SUA_CHAVE_DE_ACESSO_AQUI',
});

const preference = new MercadoPago.Preference();

preference.create({
  'items': [
    {
      'title': 'Meu produto',
      'quantity': 1,
      'currency_id': 'BRL',
      'unit_price': 100
    }
  ]
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.error('Erro ao criar a preferência:', error);
});
