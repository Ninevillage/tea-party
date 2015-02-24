var modules = require('./helpers/modules');
var logger = require('./helpers/logger');
var modulesLoader = require('./helpers/modulesLoader');

// ==== Init Logger
var Log = logger();

Log('Init Application');

// ==== HERE STARTS THE APP
var application = exports.application = modules.express();

var server = exports.server = modules.http.createServer(application);

// ==== Set Env
application.set('env', process.env.NODE_ENV || 'development');

// ==== Set Port
application.set('port', process.env.PORT || 3000);

// ==== Set IP
application.set('ip', process.env.IP || '127.0.0.1');

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

// ==== Hold Middlewares
application.set('middlewares', require('./middlewares'));

// ==== Load Environment Config
application.set('environment_config', require('./config/environments')(application));

// ==== Load Database Config
application.set('database_config', require('./config/database'));

Log('Init Database Connection');
// ==== Init Database Connection
modules.mongoose.connect(application.get('database_config'));

Log('Load Application Config');
// ==== Load Application Config
require('./config/application')(application);

Log('Load Express Applications');
// ==== Load Express Applications
exports.express = require('./express')(application);


exports.run = function() {
  Log('Listen on Port '+application.get('port'));
// ==== Listen on Port
  server.listen(application.get('port'));
};