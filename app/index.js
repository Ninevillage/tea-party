var modules = require('./helpers/modules');
var logger = require('./helpers/logger');
var modulesLoader = require('./helpers/modulesLoader');

module.exports = function() {
  // ==== Init Logger
  var Log = logger();
  
  Log('Init Application');
  
  // ==== HERE STARTS THE APP
  var application = modules.express();
  var server = modules.http.createServer(application);
  
  // ==== Set Env
  application.set('env', process.env.NODE_ENV || 'development');
  
  // ==== Hold the Server
  application.set('server', server);
  
  // ==== Hold Modules
  application.set('modules', modules);
  
  // ==== Hold Logger
  application.set('logger', logger);
  
  // ==== Hold Modules Loader
  application.set('modules_loader', modulesLoader);
  
  // ==== Hold Models
  application.set('models', require('./models'));
  
  // ==== Load Environment Config
  application.set('environment_config', require('./config/environments')(application));
  
  // ==== Load Database Config
  application.set('database_config', require('./config/database'));
  
  Log('Init Database Connection');
  // ==== Init Database Connection
  //modules.mongoose.connect(application.get('database_config'));
  
  Log('Load Application Config');
  // ==== Load Application Config
  require('./config/application')(application);
};