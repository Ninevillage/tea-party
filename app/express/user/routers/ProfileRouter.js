module.exports = function(User, application) {
  var Router = application.get('modules').express.Router();
  
  Router.get('/:username', function(req, res, next) {
    if(!req.userFromReq) return next();
    res.render('profile', {profile: req.userFromReq});
  });
  
  Router.param('username', function(req, res, next, username) {
    application.get('models').User.loadByUsername(username, function(err, user) {
      if(err) return next(err);
      req.userFromReq = user;
      next();
    });
  });
  
  return Router;
};