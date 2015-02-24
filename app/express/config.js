module.exports = function(application) {
  var modules = application.get('modules');
  
  application.set('views', modules.path.join(__dirname, '../views'));
  application.set('view engine', 'jade');
  
  application.use(modules.expresssession({
    secret: application.get('environment_config').security.secret,
    saveUninitialized: false,
    resave: true
  }));
  
  
  application.use(modules.express.static(modules.path.join(__dirname, '../public')));
  
  // ==== Access Logger
  application.use(modules.morgan('dev'));
};