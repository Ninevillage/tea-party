module.exports = function(application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  var Admin = modules.express();
  
  Log('Load Admin Config');
  require('./config')(Admin, application);
  
  // ==== Load Admin Routers
  var routers = [
    'AdminRouter'
  ];
  for(routerIndex in routers) {
    var router = routers[routerIndex];
    Admin.use(require('./routers/'+router)(Admin, application));
  }
  
  // ==== Admin 404 Error Handler
  Admin.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // ==== Admin 500 Error Handler
  Admin.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: (application.get('env') == 'development') ? err : {}
    });
  });
  
  // ==== Load Admin into Application
  application.use('/admin', Admin);

  return Admin;
};