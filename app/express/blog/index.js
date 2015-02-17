module.exports = function(application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  var Blog = modules.express();
  
  Log('Load Blog Config');
  require('./config')(Blog, application);
  
  // ==== Load Blog Routers
  var routers = [
    'BlogRouter'
  ];
  for(var routerIndex in routers) {
    var router = routers[routerIndex];
    Blog.use(require('./routers/'+router)(Blog, application));
  }
  
  // ==== Blog 404 Error Handler
  Blog.use(application.get('middlewares').notFound);
  
  // ==== Blog 500 Error Handler
  Blog.use(application.get('middlewares').htmlErrorResponse);
  
  // ==== Load Blog into Application
  application.use('/blog', Blog);
};