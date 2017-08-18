var User = require('../models/user');
var users = require('../db')

exports.createUser = function(req, res, next) {

    let data = req.body || {}

    let user = new User(data)
    user.save(function(err) {

        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
            next()
        }

        res.json({success:true,"message":"User created successfully"})
        next()

    })
};

exports.getAllUsers = function(req, res, next) {
    User.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

exports.getUserById = function(req,res, next){
    User.findOne({ _id: req.params.user_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()
    })
}

exports.updateUserById = function(req,res, next){

    let data = req.body || {}

    if (!data._id) {
        _.extend(data, {
            _id: req.params.user_id
        })
    }

    User.findOne({ _id: req.params.user_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
    }

    User.update({ _id: data._id }, data, function(err) {

            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            res.send(200, data)
            next()
        })
    })
}

exports.deleteUserById = function(req,res, next){

    User.remove({ _id: req.params.user_id }, function(err) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(204)
        next()
    })

}








