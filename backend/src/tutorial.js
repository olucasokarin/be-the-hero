const express = require('express'); //pacote
const routes = requere('./routes'); //arquivo

const app = express();

app.use(express.json()); //mostrar que receberemos json na aplicação
app.use(routes);

/**
 * Rota: url completo
 * Recurso: após a barra "/users", "/contatos", geralmente ligado à uma tabela
 */

/**
 * Tipos de parâmetros:
 * 
 * Query: parâmetros nomeado enviado na rota após "?" (filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos (uma coisa especifica, como id)
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * Driver: select * from users
  * Query Builder: table('users').select('*').where()
  */


app.get('/users', (request, response) => {
    const params = request.query; //query
    const id = request.params; //route params
    const body = request.body; //request body

    console.log(id);
    
    
    return response.json({
        evento: 'semana omministack',
        aluno: 'lucas'
    });
});

app.listen(3333);