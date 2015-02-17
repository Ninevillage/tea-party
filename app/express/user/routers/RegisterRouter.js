module.exports = function(User, application) {
  var Router = application.get('modules').express.Router();
  
  Router.get('/register', function(req, res) {
    res.render('register');
  });
  
  Router.post('/register', function(req, res) {
    
  });
  
  return Router;
};