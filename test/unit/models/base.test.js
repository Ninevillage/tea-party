var should = require('should');
var application = require(process.cwd()).application;
var modules = application.get('modules');
var database_config = application.get('database_config');

if(!modules.mongoose.connection.db) modules.mongoose.connect(database_config);

var Base = application.get('models').Base;

describe('Model: Base', function() {
  var base = null;

  beforeEach(function() {
    base = new Base();
  });

  after(function(done) {
    Base.remove(done);
  });

  var shouldSave = function(model, done, fn) {
    model.save(function(err) {
      should.not.exist(err);
      if (fn != null) {
        fn(err);
      }
      done(err);
    });
  };

  it('should pass', function(done) {
    base.validate(function(err) {
      should.not.exist(err);
      done();
    });
  });

  describe('Attributes', function() {
    it('should have a createdAt Date', function() {
      return should.exist(base.createdAt);
    });
    return it('should have a updatedAt Date', function() {
      return should.exist(base.updatedAt);
    });
  });

  describe('Pre Save', function() {
    it('should update updatedAt Value on save', function(done) {
      var currentDate;
      currentDate = base.updatedAt;
      shouldSave(base, function(err) {
        base.createdAt = new Date(0);
        setTimeout(function() {
          shouldSave(base, function(err) {
            base.updatedAt.should.not.eql(currentDate);
            done();
          });
        }, 1500);
      });
    });
  });

});