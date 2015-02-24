module.exports = function(Admin, application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  
  Admin.set('views', modules.path.join(application.get('views'), 'admin'));
  Admin.set('view engine', 'jade');
  
  Admin.use(modules.express.static(modules.path.join(__dirname, 'public')));
};