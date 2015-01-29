var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var BaseSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  }
});

BaseSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  return next();
});

BaseSchema.statics.load = function(cb) {
  return this.find({}).exec(cb);
};

BaseSchema.statics.loadBy = function(field, value, cb) {
  var params;
  params = {};
  params[field] = value;
  return this.find(params).exec(cb);
};

BaseSchema.statics.loadById = function(id, cb) {
  return this.findOne({
    _id: id
  }).exec(cb);
};

exports = module.exports;
exports.Schema = BaseSchema;
exports.Name = 'Base';