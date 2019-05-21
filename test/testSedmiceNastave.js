var app = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe("sedmice", () => {
    describe("GET /r1/sedmice/1", () => {
        it("treba vratiti sedmice nastave za neparni semestar", (done) => {
            chai.request(app)
                .get('/r1/sedmice/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('sedmice');
                    done()
                })
        })
    })
})

describe("sedmice", () => {
    describe("GET /r1/sedmice/2", () => {
        it("treba vratiti sedmice nastave za parni semestar", (done) => {
            chai.request(app)
                .get('/r1/sedmice/2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('sedmice');
                    done()
                })
        })
    })
})


