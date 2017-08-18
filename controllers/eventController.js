var Event = require('../models/event');
var TClass = require('../models/class');

// Display list of all Events
exports.getAllEvents = function(req, res, next) {
    Event.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
};

// Display Event by id
exports.getEventById = function(req, res, next) {
	Event.findOne({ id: req.params.event_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()
    })
}

exports.createEvent = function(req, res, next){

    let data = req.body || {}
    let event = new Event(data)

    TClass.find({}, function(err, docs) {
        if (!err){ 
            event.classes = docs

            event.save(function(err) {
                if (err) {
                    log.error(err)
                    return next(new errors.InternalError(err.message))
                    next()
                }

                res.json({success:true,"message":"Event created successfully", event : event})
                next()
            })
        } else {throw err;}
    })
}




