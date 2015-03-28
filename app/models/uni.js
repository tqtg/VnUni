// app/models/university.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our university model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Uni', {
    // university schema
    // basic data for filters
    id: String,
    name: String,
    type: String,   // University/college
    khoithi: {      // JSON object stores many "khoi thi" id
        id: String
    },

    // JSON array store objects(region id and city id)
    location: [     
        {
            region: String,
            city: String
        }
    ],

    // JSON array stores majors' infor 
    majors: [       
        {
            id: String,
            name: String,
            //  JSON array stores admission mark object (each year)
            admissionMarks: [
                {
                    year: Number,
                    mark: Number
                }
            ]
        }   
    ]

    // data for university infor page
});