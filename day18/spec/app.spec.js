const request = require('request');
const server = require('../app');

const BASE_URL = 'http://localhost:3000/';

describe('server', () => {
    afterAll(() => server.close());
    describe('GET /', () => {
        let data = {};
        beforeAll(done => {
            request.get(BASE_URL, (err, res, body) => {
                data.status = res.statusCode;
                data.body = body;
                done();
            });
        });
        it('should return a status of 200', () => {
            expect(data.status).toBe(200);
        });
        it('should return Hello World', () => {
            expect(data.body).toBe("Hello World");
        });
    });
});

describe('server', () => {
    afterAll(() => server.close());
    describe('GET /', () => {
        let data = {};
        beforeAll(done => {
            request.get(`${BASE_URL}test`, (err, res, body) => {
                data.status = res.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it('should return a status of 500', () => {
            expect(data.status).toBe(500);
        });
        it('should return our error message', () => {
            expect(data.body.message).toBe("An error has occurred");
        });
    });
});