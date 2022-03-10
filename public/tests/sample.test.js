const supertest = require('supertest');
const should = require('should');

var server = supertest.agent('http://localhost:3000');

describe('simple unit test', function () {

  it('should be create user',async function (done) {

    server.post('/api/register')
    .send({"firstName":"wayes",
          "lastName":"yves",
          "email":"kamsu20dylane@gmail.com",
          "password":"U@dylane12345678" 
         })
    .expect('Content-type',/json/)
    .expect(200)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.should.equal(false);
      res.body.data.equal(30);
      done();
    })
  })
})