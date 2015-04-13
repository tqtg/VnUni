var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: String,
    school: String
});


module.exports = mongoose.model('User', UserSchema); 	