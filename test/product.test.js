const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const Models = require('../models/models');
chai.use(chaiHttp);

describe('/First Test Collection', () => {

    it('it should test default API welcome route...', (done) => {

        chai.request(server)
        .get('/api/welcome')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');    
            const actualVal = res.body.message;
            expect(actualVal).to.be.equal('Welcome to this webshop with BMW models');        
            done();
        });
    });


    it('it should verify that we have 0 products in the DB', (done) => {
        chai.request(server)
        .get('/api/models')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        });
    });

    
    it('it should POST a valid product', (done) => {
        let models = {
            series: "Test Product",
            description: "Test Product Description",
            price: 360000,
            inStock: true,
            cylinder: 4,
            color: "white",
        }
        chai.request(server)
        .post('/api/models')
        .send(models)
        .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });

    it('it should verify that we have 1 product in the DB', (done) => {
        chai.request(server)
        .get('/api/models')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
        });
    });

    it('it should UPDATE a model given the id', (done) => {
        let models = new Models({
        series: "Test Product", 
        description: "Test Product Description",
        price: 360000,
        inStock: true,
        cylinder: 4,
        color: "white",
        })
        models.save((err, models) => {
            chai.request(server)
            .put('/api/models/' + models.id)
            .send({ 
            series: "Test Product2", 
            description: "Test Product Description2",
            price: 390000,
            inStock: false,
            cylinder: 3,
            color: "grey",
            })
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
            });
        });
    });

    it('it should GET a product by the given id', (done) => {
        let models = new Models({ 
        series: "Test Product2", 
        description: "Test Product Description2",
        price: 390000,
        inStock: false,
        cylinder: 3,
        color: "grey", });
        models.save((err, models) => {
            chai.request(server)
          .get('/api/models/' + models.id)
          .send(models)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('series');
                res.body.should.have.property('description');
                res.body.should.have.property('price');
                res.body.should.have.property('inStock');
                res.body.should.have.property('cylinder');
                res.body.should.have.property('color');
                res.body.should.have.property('_id').eql(models.id);
            done();
          });
        });

    });

    it('it should DELETE a model given the id', (done) => {
        let models = new Models({ 
        series: "2", 
        description: "luxury sedan",
        price: 430000,
        inStock: true,
        cylinder: 6,
        color: "black",})
        models.save((err, models) => {
              chai.request(server)
              .delete('/api/models/' + models.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Model successfully deleted!');
                done();
              });
        });
    });
})




   