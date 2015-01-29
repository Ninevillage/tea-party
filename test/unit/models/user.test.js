var should = require('should');
var modules = require(process.env.MODULES);
var database_config = require(modules.path.join(process.env.CONFIG, 'database'));

if(!modules.mongoose.connection.db) modules.mongoose.connect(database_config);
var models = require(process.env.MODELS);

var User = models.User;

describe('Model: User', function() {
  describe('Attributes', function() {
    it('should pass', function() {
      true.should.be.ok;
    });
  });
});