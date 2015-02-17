var mongoose = require('mongoose');

var extend = require('mongoose-schema-extend');

var validate = require('mongoose-validator');

var base = require('./base');

var PageSchema = base.Schema.extend({
  title: {
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
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    caseInsensitive: true,
    validate: [
      validate({
        validator: 'isLength',
        "arguments": [2, 250],
        message: 'Slug should be between 3 and 250 characters'
      })
    ]
  },
  text: {
      type: String
  },
  meta: {
      title: {
        type: String,
        trim: true,
        validate: [
          validate({
            validator: 'isLength',
            "arguments": [0, 30],
            message: 'Meta Title should be between 0 and 30 characters'
          })
        ]
      },
      description: {
        type: String,
        trim: true,
        validate: [
          validate({
            validator: 'isLength',
            "arguments": [0, 100],
            message: 'Meta Description should be between 3 and 100 characters'
          })
        ]
      }
  }
});

PageSchema.statics.load = function(cb) {
  return this.find({}).exec(cb);
};

PageSchema.statics.loadBySlug = function(slug, cb) {
  return this.findOne({
    slug: slug
  }).exec(cb);
};

exports = module.exports;
exports.Schema = PageSchema;
exports.Name = 'Page';