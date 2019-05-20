var app = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe("mojiPredmeti student", () => {
    describe("GET /r1/mojiPredmeti/1", () => {
        it("treba vratiti predmete za studenta", (done) => {
            chai.request(app)
                .get('/r1/mojiPredmeti/1')
                .query({uloga:'STUDENT'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('predmeti');
                    
                    done()
                })
        })
    })
})

describe("mojiPredmeti profesor", () => {
    describe("GET /r1/mojiPredmeti/235", () => {
        it("treba vratiti predmete za profesora", (done) => {
            chai.request(app)
                .get('/r1/mojiPredmeti/235')
                .query({uloga:'PROFESOR'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('predmeti')
                    done()
                })
        })
    })
})

describe("mojiPredmeti asistent", () => {
    describe("GET /r1/mojiPredmeti/41", () => {
        it("treba vratiti predmete za asistenta", (done) => {
            chai.request(app)
                .get('/r1/mojiPredmeti/41')
                .query({uloga:'ASISTENT'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('predmeti')
                    done()
                })
        })
    })
})