var TClass = require('../models/class');

exports.getAllClasses = function(req, res, next) {
    TClass.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

exports.getClassById = function(req, res, next) {
    TClass.findOne({ id: req.params.class_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()

    })
};