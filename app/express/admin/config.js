module.exports = function(Admin, application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  
  Admin.set('views', modules.path.join(__dirname, 'views'));
  Admin.set('view engine', 'jade');
  
  
  // ==== Loading BodyParser
  Admin.use(modules.bodyparser.json());
  Admin.use(modules.bodyparser.urlencoded({ extended: true }));
  
  
  
};