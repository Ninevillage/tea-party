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
  username: {
    type: String,
    unique: true,
    required: true,
    caseInsensitive: true,
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
    caseInsensitive: true,
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
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

UserSchema.path('username').validate(function (value, done) {
  var regex = /^[a-zA-Z0-9]+$/;
  done(regex.test(value));
}, 'Username can not contain special characters');

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