module.exports = function(application) {
  var env = process.env.NODE_ENV || 'development';
  return application.get('modules').lodash.merge(require('./all'), require('./'+env));
};