const supertest = require('supertest');

var server = supertest.agent('http://localhost:3000/api');

describe('simple unit test', function () {

  it('should be get all users', async () => {
    
    const res = await server.get('/users')
    .send()

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();

  })
})