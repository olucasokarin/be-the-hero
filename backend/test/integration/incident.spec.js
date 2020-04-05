const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('INCIDENTS', () =>{
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll( async () => {
        await connection.destroy();
    })


    it('shoul be able to create a new incident', async () =>{
        const response = await request(app)
        .post('/incidents')
        .set('authorization', '61d52a22')
        .send({
            title : "caso 22",
            description : "detalhes", 
            value : 120
        });

        expect(response.body).toHaveProperty('id');
        
    });
})