module.exports = function(API, application) {
  var modules = application.get('modules');
  var models = application.get('models');
  var config = application.get('environment_config');
  var Log = application.get('logger');
  
  var Router = modules.express.Router();
  
  Router.post('/token', function(req, res) {
    if(req.body.email == null || req.body.password == null) {
      return res.json(401, "missing credentials");
    } else {
      models.User.loadBy(
        'email',
        req.body.email, 
        function (err, user) {
          if (err || user == null) {
            return res.json(401, "wrong credentials");
          } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
              if(err) return res.json(401, "wrong credentials");
              if(!isMatch) return res.json(401, "wrong credentials");
              
              // We are sending the profile inside the token
              var duration_in_minutes = modules.moment.duration(
                config.api.security.token_duration_in_days, 'days'
              ).asMinutes();
              
              Log('Setup Token for ' +user.email+'. Expires in ' +duration_in_minutes);
              var token = modules.jsonwebtoken.sign(
                {_id: user._id, email: user.email, createdAt:user.createdAt},
                config.api.security.secret,
                { expiresInMinutes: duration_in_minutes}
              );
              
              res.json({ token: token });
              
            });
          }
        }
      );
    }
  });
  return Router;
};