module.exports = function(User, application) {
  var Router = application.get('modules').express.Router();
  
  Router.get('/account', function(req, res) {
    console.log("LOOOL");
    res.render('account');
  });
  
  return Router;
};