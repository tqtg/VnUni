var mongoose = require('mongoose');

var uniSchema = mongoose.Schema({
    id: String,
    name: String,
    address: String,
    phone : String,
    email: String,
    website: String,
    region: Number,
    city: Number,
    type: Number,

    majors: [
        {
            id: String,     //  major id
            name: String,
            divisions: {
                division: String    // division id
            },
            admissionMarks: [
                {
                    year: Number,
                    mark: Number
                }
            ]
        }
    ],

    faculties: [
        {
            id: String,
            name : String,
            description: String,
            majors: [String]
        }
    ]    
})

uniSchema.statics.findWithFilter = function findWithFilter(queryParams, cb) {
    var count = 0;
    if (queryParams['majors']['$elemMatch'].id == 0) {
        delete queryParams['majors']['$elemMatch'].id;
        count++;
    }
    if (queryParams['majors']['$elemMatch'].divisions == "0") {
        delete queryParams['majors']['$elemMatch'].divisions;
        count++;
    }
    if (queryParams['majors']['$elemMatch']['admissionMarks']['$elemMatch']['mark']['$gt'] == 0
        && queryParams['majors']['$elemMatch']['admissionMarks']['$elemMatch']['mark']['$lt'] == 30) {
        count++;
    }
    if (count == 3) queryParams.majors = 0;
    for (var key in queryParams) {
        if (queryParams[key] == 0) {
            delete queryParams[key];
        }
    }

	console.log(queryParams);
    return this.find({$query: queryParams, $orderby: { region : 1 }}, 'id name address phone website -_id', cb);
}

uniSchema.statics.findWithTags = function findWithTags(queryParams, cb) {
    if (queryParams['$or'][0]['region'] == 0) {
        queryParams['$or'].splice(0,1);
    }
    if (queryParams['$or'].length == 2 && queryParams['$or'][1]['city'] == 0) {
        queryParams['$or'].splice(1,2);
    } else if (queryParams['$or'].length == 1 && queryParams['$or'][0]['city'] == 0) {
        queryParams['$or'].splice(0,1);
    }
    var count = 0;
    if (queryParams['majors']['$elemMatch'].id == 0) {
        delete queryParams['majors']['$elemMatch'].id;
        count++;
    }
    if (queryParams['majors']['$elemMatch'].divisions == 0) {
        delete queryParams['majors']['$elemMatch'].divisions;
        count++;
    }
    if (count == 2) queryParams.majors = 0;
    for (var key in queryParams) {
        if (queryParams[key] == 0) {
            delete queryParams[key];
        }
    }
    
    console.log(queryParams);
    return this.find({$query: queryParams, $orderby: { region : 1 }}, 'id name address phone website -_id', cb);
}

uniSchema.statics.getUni = function getUni(queryParams, cb) {
    return this.find({$query: queryParams}, 'id name -_id', cb);
}

uniSchema.statics.getMajors = function getMajors(queryParams, cb) {
    return this.find({$query: queryParams}, 'majors -_id', cb);
}

module.exports = mongoose.model('University', uniSchema);