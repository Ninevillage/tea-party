module.exports = function (application) {
  var modules = application.get('modules');
  var Log = application.get('logger')();
  
  Log('Load Express Config');
  require('./config')(application);
  
  Log('Load API Application');
  require('./api')(application);
  
  Log('Load Blog Application');
  require('./blog')(application);
  
  Log('Load Root Application'); // ROOT MUST BE THE LAST
  require('./root')(application);
};