module.exports = function(application) {
  var modules = application.get('modules');
  
  application.set('views', modules.path.join(__dirname, '../views'));
  application.set('view engine', 'jade');
  
  application.disable('x-powered-by');
  
  // ==== Loading BodyParser
  application.use(modules.bodyparser.json());
  application.use(modules.bodyparser.urlencoded({ extended: true }));
  
  // ==== Session Support
  application.use(modules.expresssession({
    secret: application.get('environment_config').security.secret,
    saveUninitialized: false,
    resave: true
  }));
  
  // ==== Cookie Parser
  application.use(modules.cookieparser());
  // ==== Method Override
  application.use(modules.methodoverride());
  
  // ==== Passport Init
  application.use(modules.passport.initialize());
  // ==== Passport Session
  application.use(modules.passport.session());
  
  // ==== Flash
  application.use(modules.connectflash());
  
  // ==== Application Favicon
  application.use(modules.servefavicon(modules.path.join(__dirname, '../public/images/favicon.ico')));
  // ==== Static Files
  application.use(modules.express.static(modules.path.join(__dirname, '../public')));
  
  // ==== Access Logger
  application.use(modules.morgan('dev'));
};