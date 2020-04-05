const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors()); //modulo de segurança, determina quem pode acessar, com a url de origin por exemplo
app.use(express.json()); //mostrar que receberemos json na aplicação
app.use(routes);
app.use(errors()); //mudança dos erros padrão para erros html


module.exports = app;