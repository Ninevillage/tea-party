module.exports = function(Blog, application) {
  var modules = application.get('modules');
  
  Blog.set('views', modules.path.join(application.get('views'), 'blog'));
  Blog.set('view engine', 'jade');
  
  Blog.use(modules.express.static(modules.path.join(__dirname, 'public')));
};