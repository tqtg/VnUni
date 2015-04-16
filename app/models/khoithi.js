var mongoose = require('mongoose');

var khoithiSchema = mongoose.Schema({
    id: String,
    name: String
})

khoithiSchema.statics.getAll = function getAll(cb) {
	return this.find({}, '-_id', cb);
}

module.exports = mongoose.model('Khoithi', khoithiSchema);