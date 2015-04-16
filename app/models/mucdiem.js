var mongoose = require('mongoose');

var mucdiemSchema = mongoose.Schema({
    id: Number,
    name: String
})

mucdiemSchema.statics.getAll = function getAll(cb) {
	return this.find({}, '-_id', cb);
}

module.exports = mongoose.model('Mucdiem', mucdiemSchema);