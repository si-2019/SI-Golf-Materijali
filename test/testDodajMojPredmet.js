var app = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe("dodavanje u moje predmete", () => {
    describe("POST /r1/dodajMojPredmet/1/9", () => {
        it("treba dodati vezu predmet student", (done) => {
            chai.request(app)
                .post('/r1/dodajMojPredmet/1/9')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('OK');
                    done()
                })
        })
    })
})