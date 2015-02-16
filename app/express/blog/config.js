module.exports = function(Blog, application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  
  Blog.set('views', modules.path.join(__dirname, 'views'));
  Blog.set('view engine', 'jade');
  
  
  // ==== Loading BodyParser
  Blog.use(modules.bodyparser.json());
  Blog.use(modules.bodyparser.urlencoded({ extended: true }));
  
  
  
};