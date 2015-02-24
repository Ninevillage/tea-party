var should = require('should');
var supertest = require('supertest');
var teaParty = require(process.cwd());
var application = teaParty.application;
var apps = teaParty.express;
var modules = application.get('modules');
var database_config = application.get('database_config');

if (!modules.mongoose.connection.db) modules.mongoose.connect(database_config);

var User = application.get('models').User;

describe('Request: API', function () {
    var userData = {
        name: 'test',
        username: 'test',
        email: 'test@test.com',
        password: 'test12345678'
    };

    before(function (done) {
        User.create(userData, done);
    });

    after(function (done) {
        User.remove(done);
    });

    describe('POST /api/token', function () {

        var postToken = function (data, callback) {
            supertest(application)
                .post('/api/token')
                .send(data)
                .end(callback);
        };

        it('should response 401', function (done) {
            postToken({}, function (err, res) {
                should.not.exist(err);
                res.status.should.be.eql(401);
                done();
            });
        });

        it('should response a valid jwt token', function (done) {
            postToken({
                login: userData.email,
                password: userData.password
            }, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('token');
                done();
            });
        });
    });
});