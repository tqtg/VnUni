var mongoose = require('mongoose');

var uniSchema = mongoose.Schema({
    id: String,
    name: String,
    region: Number,
    city: Number,
    type: Number,

    //	Major
    majors: [
    	{
    		id: String,		//	major id
            name: String,
    		divisions: {
    			division: String	// division id
    		},
    		admissionMarks: [
    			{
    				year: Number,
    				mark: Number
    			}
    		]
    	}
    ]
})

uniSchema.statics.getAll = function getAll(queryParams, cb) {
	for (var key in queryParams) {
		if (queryParams[key] == 0 || queryParams[key] == "0") {
			delete queryParams[key];
			// console.log(key);
		} else if (key == "majors") {
            // console.log("here is major query")
            if (queryParams[key]["$elemMatch"]["id"] == "0") {
                // console.log("major id is 0")
                delete queryParams[key];
            }
        }
	}
	// console.log(queryParams);
    return this.find({$query: queryParams, $orderby: { region : 1 }}, {'id': 1, 'name': 1, '_id': 0}, cb);
}

module.exports = mongoose.model('University', uniSchema);