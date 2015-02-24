module.exports = function(Root, application) {
  var modules = application.get('modules');
  
  Root.set('views', modules.path.join(application.get('views'), 'root'));
  Root.set('view engine', 'jade');
  
  Root.use(modules.express.static(modules.path.join(__dirname, 'public')));
};