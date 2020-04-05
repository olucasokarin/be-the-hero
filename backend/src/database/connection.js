const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' //variavel ambiente
            ? configuration.test : configuration.development; 

const connection = knex(config);

module.exports = connection;