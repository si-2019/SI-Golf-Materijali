var app = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe("predmeti", () => {
    describe("GET /r1/predmeti/1/RI/6", () => {
        it("treba vratiti predmete za prvi ciklu,RI, 6. semestar", (done) => {
            chai.request(app)
                .get('/r1/predmeti/1/RI/6')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('predmeti');
                    
                    done()
                })
        })
    })
})

describe("predmeti", () => {
    describe("GET /r1/predmeti/3/EE/2", () => {
        it("treba vratiti predmete za treci ciklu,EE, 2. semestar", (done) => {
            chai.request(app)
                .get('/r1/predmeti/3/EE/2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('predmeti');
                    
                    done()
                })
        })
    })
})
