module.exports = function(User, application) {
  var Router = application.get('modules').express.Router();
  
  Router.get('/logout', function(req, res, next) {
    next();
  });
  
  return Router;
};