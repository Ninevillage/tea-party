module.exports = function(API, application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  
  API.use(modules.expressjwt({
    secret: application.get('environment_config').api.security.secret
  }).unless({
    path: ['/api/token', '/api/register']
  }));
  
  // ==== Loading BodyParser
  API.use(modules.bodyparser.json());
  API.use(modules.bodyparser.urlencoded({ extended: true }));
  
};