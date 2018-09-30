const request = require('supertest');
const { describe, it } = require('jest');
const { server } = require('../server/index.js');

describe('GET /', () => {
  it('should respond with 200', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end(done);
  });
});
