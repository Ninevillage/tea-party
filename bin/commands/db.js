var path = require('path');

var dbConfig = require('../../app/config/database');

var errorHandler = function(err) {
  if(err) console.log(err);
};

exports.dbSeed = function() {
    var fixtures = require('pow-mongodb-fixtures').connect(dbConfig);
    fixtures.load(path.join(__dirname, '../../db/seeds.js'), errorHandler);
};

exports.dbMigrate = function() {
    
};

exports.dbRollback = function() {
    
};

exports.dbClear = function() {
    var fixtures = require('pow-mongodb-fixtures').connect(dbConfig, {});
    fixtures.clear(errorHandler);
};