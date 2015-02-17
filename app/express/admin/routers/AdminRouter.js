module.exports = function(Admin, application) {
  var Router = application.get('modules').express.Router();
  
  Router.use(function(req, res, next) {
      var error = new Error('Not allowed');
      error.status = 403;
      
      var renderError = function() {
        res.render('error', {
          message: error.message,
          error: error
        });
      };
      
      if(!req.user) return renderError();
      if(!req.user.admin) return renderError();
      
      next();
  });
  
  Router.get('*', function(req,res) {
      res.render('index');
  });
  
  return Router;
};