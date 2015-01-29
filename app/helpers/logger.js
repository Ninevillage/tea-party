var appName, debug, formatLoggerNameFromCaller, getLogger, getMyCaller, log, path, pkg;

debug = require('debug');

path = require('path');

pkg = require(path.join(__dirname, '../../package.json'));

process.env.LOGGER = __filename;

appName = process.env.APPNAME || pkg.name;

appName = appName.toLowerCase();

getLogger = module.exports = function(loggerName) {
  var caller;
  if (loggerName != null) {
    return debug("" + appName + ":" + loggerName);
  }
  caller = getMyCaller();
  if (caller == null) {
    return debug(appName);
  }
  if (loggerName == null) {
    return debug("" + appName + ":" + (formatLoggerNameFromCaller(caller)));
  }
};

getMyCaller = function() {
  var callerfile, currentfile, e, err;
  try {
    err = new Error;
    Error.prepareStackTrace = function(err, stack) {
      return stack;
    };
    currentfile = err.stack.shift().getFileName();
    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();
      if (callerfile === 'module.js') {
        return __filename;
      }
      if (currentfile !== callerfile) {
        return callerfile;
      }
    }
  } catch (_error) {
    e = _error;
  }
  return void 0;
};

formatLoggerNameFromCaller = function(caller) {
  var pathsegments, relativePathToCWD;
  relativePathToCWD = path.relative(process.cwd(), caller);
  pathsegments = relativePathToCWD.split(path.sep);
  return pathsegments.join('_');
};

log = getLogger();

log('Init Logger');