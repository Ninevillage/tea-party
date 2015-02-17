var development = "mongodb://localhost/tea_party-development";
var test = "mongodb://localhost/tea_party-test";
var production = process.env.MONGOSOUP_URL || "mongodb://localhost/tea_party";

var options = {};
var env = process.env.NODE_ENV || 'development';

if(env == 'production') {
  options = production;
} else if (env == 'test') {
  options = test;
} else {
  options = development;
}

module.exports = options;