module.exports = function (application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();

  var apps = {};
  
  Log('Load Express Config');
  require('./config')(application);
  
  Log('Load API Application');
  apps.api = require('./api')(application);
  
  Log('Load Admin Application');
  apps.admin = require('./admin')(application);
  
  Log('Load Blog Application');
  apps.blog = require('./blog')(application);
  
  Log('Load User Application');
  apps.user = require('./user')(application);
  
  Log('Load Root Application'); // ROOT SHOULD BE THE LAST
  apps.root = require('./root')(application);

  return apps;
};