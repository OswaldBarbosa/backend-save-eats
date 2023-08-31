/* ***************************************************************************************************************************************************
 * Objetivo : API para integração entre back e banco de dados (GET,POST,PUT,DELETE)
 * Autor : Caroline Portela
 * Data 30/08/2023
 * Versão : 1.0 
 *************************************************************************************************************************************************** */

//Import das bibliotecas para API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Import do arquivo de configuração das variaveis,constantes e funcoes globais.
var message = require('./controller/modulo/config.js')