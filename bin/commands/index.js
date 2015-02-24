var Loader = require('../../app/helpers/modulesLoader');
var _ = require('lodash');
var commandsHolders = Loader(__dirname);

var commands = {};

var keys = Object.keys(commandsHolders);
for(var keyIndex in keys) {
    var key = keys[keyIndex];
    commands = _.merge(commands, commandsHolders[key]);
}

module.exports = commands;