var mongoose = require('mongoose');
require('mongoose-schema-extend');

var validate = require('mongoose-validator');

var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

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
        select: false, // By Default not in case
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

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });

});

UserSchema.statics.load = function (cb) {
    return this.find({}).exec(cb);
};

UserSchema.statics.loadById = function (id, cb) {
    return this.findOne({
        _id: id
    }).exec(cb);
};

UserSchema.statics.loadByUsernameOrEmail = function (credential, cb) {
    this.loadByUsernameOrEmailWithPassword(credential, cb, true);
};

UserSchema.statics.loadByUsernameOrEmailWithPassword = function (credential, cb, noPass) {
    var regexForEmail = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    var regex = new RegExp(['^', credential, '$'].join(''), 'i');

    var pass, query;

    query = {};

    pass = '';

    if (!noPass) {
        pass = '+password';
    }

    if (regexForEmail.test(credential)) {
        query['email'] = regex;
    } else {
        query['username'] = regex;
    }

    this.findOne(query, pass).exec(cb);
};

UserSchema.statics.loadByUsername = function (username, cb) {
    return this.findOne({
        username: username
    }).exec(cb);
};

UserSchema.methods = {
    generateRandomToken: function () {
        var user = this,
            chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            token = new Date().getTime() + '_';
        for (var x = 0; x < 16; x++) {
            var i = Math.floor(Math.random() * 62);
            token += chars.charAt(i);
        }
        return token;
    },
    comparePassword: function (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
};

exports = module.exports;
exports.Schema = UserSchema;
exports.Name = 'User';