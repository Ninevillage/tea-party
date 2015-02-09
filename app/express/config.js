module.exports = function(application) {
  var modules = application.get('modules');
  
  // ==== Access Logger
  application.use(modules.morgan('dev'));
};