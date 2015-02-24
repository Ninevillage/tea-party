module.exports = function(application) {
  var modules = application.get('modules');
  
  application.get('eventemitter').on('db:connected', function() {
    // Load Fixtures
    modules.fixtures.load(modules.path.join(__dirname, '../../db/seeds.js'), application.get('db'));
  });
};