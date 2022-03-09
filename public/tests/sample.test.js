const request = require('supertest');
const app = require('../server');

describe('User endPoint',()=>{
  it('should be create a new user',async()=>{
    const res= await request(app)
    .post('/api/register')
    .send({ firstName:"kamsu",
            lastName:"dylane",
            email:"kamsu97dylane@gmail.com",
            password:"U@dylane12345678"
          })
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('user');
    });   
})