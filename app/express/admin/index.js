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
  for(var routerIndex in routers) {
    var router = routers[routerIndex];
    Admin.use(require('./routers/'+router)(Admin, application));
  }
  
  
  // ==== Admin 404 Error Handler
  Admin.use(application.get('middlewares').notFound);
  
  // ==== Admin 500 Error Handler
  Admin.use(application.get('middlewares').htmlErrorResponse);
  
  
  // ==== Load Admin into Application
  application.use('/admin', Admin);

  return Admin;
};