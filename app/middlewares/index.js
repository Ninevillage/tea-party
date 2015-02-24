var Loader = require('../helpers/modulesLoader');
var log = require('../helpers/logger')();
var _ = require('lodash');
var middlewaresHolders = Loader(__dirname);

var middlewares = {};

var keys = Object.keys(middlewaresHolders);
for(var keyIndex in keys) {
    var key = keys[keyIndex];
    middlewares = _.merge(middlewares, middlewaresHolders[key]);
}
log('Loaded Middlewares');
module.exports = middlewares;