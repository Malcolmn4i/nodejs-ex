var Heat = require('../models/heat');

exports.getAllHeats = function(req, res, next) {
    Heat.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

exports.getHeatById = function(req, res, next) {
    Heat.findOne({ id: req.params.heat_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()

    })
};