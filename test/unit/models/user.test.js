var should = require('should');
var application = require(process.cwd()).application;
var modules = application.get('modules');
var database_config = application.get('database_config');

if(!modules.mongoose.connection.db) modules.mongoose.connect(database_config);
var models = application.get('models');

var User = models.User;

describe('Model: User', function() {
  describe('Attributes', function() {
    it('should pass', function() {
      true.should.be.ok;
    });
  });
});