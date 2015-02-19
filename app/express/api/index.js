module.exports = function(application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  var API = modules.express();
  
  Log('Load API Config');
  require('./config')(API, application);
  
  // ==== Load API Routers
  var routers = [
    'TokenRouter',
    'RegisterRouter',
    'UsersRouter',
    'PartiesRouter',
  ];
  for(var routerIndex in routers) {
    var router = routers[routerIndex];
    API.use(require('./routers/'+router)(API, application));
  }
  
  // ==== API 404 Error Handler
  API.use(application.get('middlewares').notFound);
  
  // ==== API 500 Error Handler
  API.use(application.get('middlewares').jsonErrorResponse);
  
  // ==== Load API into Application
  application.use('/api', API);

  return API;
};