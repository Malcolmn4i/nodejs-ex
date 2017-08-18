'use strict'

var             mongoose = require('mongoose')
var     mongooseApiQuery = require('mongoose-api-query')
var      createdModified = require('mongoose-createdmodified').createdModifiedPlugin
var               bcrypt = require('bcrypt')
var               Schema = mongoose.Schema

const HeatSchema = new mongoose.Schema({
    name: {
        type: String
    },
    id: {
        type: Number
    }
}, { minimize: false });

HeatSchema.plugin(mongooseApiQuery)
HeatSchema.plugin(createdModified, { index: true })

const Heat = mongoose.model('Heat', HeatSchema)
module.exports = Heat