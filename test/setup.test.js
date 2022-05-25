process.env.NODE_ENV = 'test';

const models = require('../models/models');

 //clean up the database before and after each test
before((done) => { 
    models.deleteMany({}, function(err) {});
    done();
});

after((done) => {
    models.deleteMany({}, function(err) {});
    done();
});
