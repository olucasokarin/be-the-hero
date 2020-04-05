const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () =>{
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll( async () => {
        await connection.destroy();
    })

    it('shoul be able to create a ne ong', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name : "APAD",
            email : "contato@ad.com",
            whatsapp : "6912345678",
            city : "novo gama",
            uf : "GO"
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        
    });
})