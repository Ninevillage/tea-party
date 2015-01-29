var mongoose = require('mongoose');

var extend = require('mongoose-schema-extend');

var validate = require('mongoose-validator');

var base = require('./base');

var UserSchema = base.Schema.extend({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: [
      validate({
        validator: 'isLength',
        "arguments": [3, 30],
        message: 'Name should be between 3 and 30 characters'
      })
    ]
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Email must be valid email address'
      })
    ]
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: [
      validate({
        validator: 'isLength',
        "arguments": [8, 30],
        message: 'Password should be between 8 and 30 characters'
      })
    ]
  }
});

UserSchema.statics.load = function(cb) {
  return this.find({}).exec(cb);
};

UserSchema.statics.loadById = function(id, cb) {
  return this.findOne({
    _id: id
  }).exec(cb);
};

exports = module.exports;
exports.Schema = UserSchema;
exports.Name = 'User';