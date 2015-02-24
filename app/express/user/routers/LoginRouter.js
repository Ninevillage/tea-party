module.exports = function(User, application) {
  var Router = application.get('modules').express.Router();
  
  Router.get('/login', function(req, res) {
    res.render('login');
  });
  
  Router.post('/login', function(req, res) {
    console.log(req.body);
    res.send("LOL");
  });
  
  return Router;
};