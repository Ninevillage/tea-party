module.exports = function(Root, application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  
  Root.set('views', modules.path.join(application.get('views'), 'root'));
  Root.set('view engine', 'jade');
  
  
  // ==== Loading BodyParser
  Root.use(modules.bodyparser.json());
  Root.use(modules.bodyparser.urlencoded({ extended: true }));
  
  
  
};