module.exports = function (application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  
  Log('Load Express Config');
  require('./config')(application);
  
  Log('Load Root Application');
  require('./root')(application);
  
  Log('Load API Application');
  require('./api')(application);
};