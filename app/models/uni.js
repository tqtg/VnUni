// app/models/university.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our university model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Uni', {
    // university schema
    // basic data for filters
    id: String,
    tentruong: String,
    nganhhoc: [String],
    khoithi: [String],
    diemchuam: Number,
    vungmien: String,
    thanhpho: String,
    
    // data for university infor page
});