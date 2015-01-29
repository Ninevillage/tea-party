var mongoose = require('mongoose');

var extend = require('mongoose-schema-extend');

var validate = require('mongoose-validator');

var base = require('./base');

var PartySchema = base.Schema.extend({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: [
      validate({
        validator: 'isLength',
        "arguments": [3, 30],
        message: 'Name should be between 3 and 30 characters'
      })
    ]
  }
});

PartySchema.statics.load = function(cb) {
  return this.find({}).exec(cb);
};

PartySchema.statics.loadById = function(id, cb) {
  return this.findOne({
    _id: id
  }).exec(cb);
};

exports = module.exports;
exports.Schema = PartySchema;
exports.Name = 'Party';