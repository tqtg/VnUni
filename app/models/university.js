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

    faculties:[
        {
            id: String,
            name : String,
            description: String,
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
            ]

        }
    ]    
})

uniSchema.statics.getAll = function getAll(queryParams, cb) {
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
    if (count == 2) {
        delete queryParams['$and'][1]['$or'];
    }

	console.log(queryParams);
    return this.find({$query: queryParams, $orderby: { region : 1 }}, {'id': 1, 'name': 1, '_id': 0}, cb);
}

module.exports = mongoose.model('University', uniSchema);