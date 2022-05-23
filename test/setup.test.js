process.env.NODE_ENV = 'test';

const Product = require('../models/models');

 //clean up the database before and after each test
before((done) => { 
    Product.deleteMany({}, function(err) {});
    done();
});

after((done) => {
    Product.deleteMany({}, function(err) {});
    done();
});
