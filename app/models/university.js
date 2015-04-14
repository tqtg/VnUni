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
    for (var key in queryParams['$and'][0]) {
        if (queryParams['$and'][0][key] == 0) {
            delete queryParams['$and'][0][key];
        }
    }
    var count = 0;
    if (queryParams['$and'][1]['$or'][0]['majors']['$elemMatch'].id == "D0") {
        delete queryParams['$and'][1]['$or'][0]['majors']['$elemMatch']['id'];
        delete queryParams['$and'][1]['$or'][1]['majors']['$elemMatch']['id'];
        count++;
    } 
    if (queryParams['$and'][1]['$or'][0]['majors']['$elemMatch'].divisions == "0") {
        delete queryParams['$and'][1]['$or'][0]['majors']['$elemMatch']['divisions'];
        delete queryParams['$and'][1]['$or'][1]['majors']['$elemMatch']['divisions'];
        count++;
    }
    if (queryParams['$and'][1]['$or'][0]['majors']['$elemMatch']["admissionMarks"]["$elemMatch"]["mark"]["$gt"] == 0
        &&  queryParams['$and'][1]['$or'][0]['majors']['$elemMatch']["admissionMarks"]["$elemMatch"]["mark"]["$lt"] == 30) {
        console.log("here");
        count++;
    }
    if (count == 3) {
        delete queryParams['$and'][1]['$or'];
    }

	console.log(queryParams);
    return this.find({$query: queryParams, $orderby: { region : 1 }}, 'id name -_id', cb);
}

uniSchema.statics.findWithTags = function findWithTags(queryParams, cb) {
    for (var key in queryParams['$and'][0]) {
        if (queryParams['$and'][0][key] == 0) {
            delete queryParams['$and'][0][key];
        }
    }
    
    console.log(queryParams);
    return this.find({$query: queryParams, $orderby: { region : 1 }}, 'id name -_id', cb);
}

module.exports = mongoose.model('University', uniSchema);