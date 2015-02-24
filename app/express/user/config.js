module.exports = function(User, application) {
  var modules = application.get('modules');
  
  User.set('views', modules.path.join(application.get('views'), 'user'));
  User.set('view engine', 'jade');
  
  User.use(modules.express.static(modules.path.join(__dirname, 'public')));
};