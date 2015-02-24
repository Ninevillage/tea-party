module.exports = function(application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  var Root = modules.express();
  
  Log('Load Root Config');
  require('./config')(Root, application);
  
  // ==== Load Root Routers
  var routers = [
    'RootRouter'
  ];
  for(var routerIndex in routers) {
    var router = routers[routerIndex];
    Root.use(require('./routers/'+router)(Root, application));
  }
  
  // ==== Load Root into Application
  application.use('/', Root);

  return Root;
};