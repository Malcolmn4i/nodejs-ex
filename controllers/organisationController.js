var Organisation = require('../models/organisation');

// Display list of all Organisations
exports.getAllOrganisations = function(req, res, next) {
    Organisation.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};