module.exports = function(Blog, application) {
  var Router = application.get('modules').express.Router();
  
  Router.get('/', function(req,res) {
      res.render('index');
  });
  
  return Router;
};