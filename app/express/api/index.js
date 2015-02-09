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
  for(routerIndex in routers) {
    var router = routers[routerIndex];
    API.use(require('./routers/'+router)(API, application));
  }
  
  // ==== API 404 Error Handler
  API.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // ==== API 500 Error Handler
  API.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (application.get('env') == 'development') ? err : {}
    });
  });
  
  // ==== Load API into Application
  application.use('/api', API);
};