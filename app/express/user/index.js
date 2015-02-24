module.exports = function(application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  var User = modules.express();
  
  Log('Load User Config');
  require('./config')(User, application);
  
  // ==== Load User Routers
  var routers = [
    'LoginRouter',
    'LogoutRouter',
    'RegisterRouter',
    'ProfileRouter',
    'AccountRouter'
  ];
  for(var routerIndex in routers) {
    var router = routers[routerIndex];
    User.use(require('./routers/'+router)(User, application));
  }

  // ==== User 404 Error Handler
  // User.use(application.get('middlewares').notFound);

  // ==== User 500 Error Handler
  // User.use(application.get('middlewares').htmlErrorResponse);

  // ==== Load User into Application
  application.use('/', User);

  return User;
};