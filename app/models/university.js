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
    		id: Number,		//	major id
    		name: String, 	//	major name
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
			console.log(key);
		}
	}
	console.log(queryParams);
    return this.find({$query: queryParams, $orderby: { region : 1 }}, cb);
}

module.exports = mongoose.model('University', uniSchema);