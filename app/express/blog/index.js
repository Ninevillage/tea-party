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
  for(routerIndex in routers) {
    var router = routers[routerIndex];
    Blog.use(require('./routers/'+router)(Blog, application));
  }
  
  // ==== Blog 404 Error Handler
  Blog.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // ==== Blog 500 Error Handler
  Blog.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: (application.get('env') == 'development') ? err : {}
    });
  });
  
  // ==== Load Blog into Application
  application.use('/blog', Blog);
};