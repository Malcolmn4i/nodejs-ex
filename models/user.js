'use strict'

var             mongoose = require('mongoose')
var     mongooseApiQuery = require('mongoose-api-query')
var      createdModified = require('mongoose-createdmodified').createdModifiedPlugin
var               bcrypt = require('bcrypt')
var               Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        require:true
    },
    userEmail: {
        type: String
    },
    userPassword: {
        type: String,
        require: true
    },
}, { minimize: false });


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('userPassword') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.userPassword, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.userPassword = hash;
                next();
            })
        })
    } else {
        return next();
    }
})
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.userPassword, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

UserSchema.plugin(mongooseApiQuery)
UserSchema.plugin(createdModified, { index: true })


const User = mongoose.model('User', UserSchema)
module.exports = User

