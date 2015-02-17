module.exports = function(User, application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  
  User.set('views', modules.path.join(__dirname, 'views'));
  User.set('view engine', 'jade');
  
  
  // ==== Loading BodyParser
  User.use(modules.bodyparser.json());
  User.use(modules.bodyparser.urlencoded({ extended: true }));
  
  
  
};