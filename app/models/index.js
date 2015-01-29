var Loader, log, mongoose, schema, schemaKey, schemas;

log = require('../helpers/logger')();

mongoose = require('mongoose');

Loader = require('../helpers/modulesLoader');

log('Load Schemas');

schemas = Loader(require('path').join(__dirname, 'schemas'));

log('Exports Schemas as Mongoose Models');
for (schemaKey in schemas) {
  schema = schemas[schemaKey];
  exports[schema.Name] = mongoose.model(schema.Name, schema.Schema);
}