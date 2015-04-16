var mongoose = require('mongoose');

var vungmienSchema = mongoose.Schema({
    id: Number,
    name: String
})

vungmienSchema.statics.getAll = function getAll(cb) {
	return this.find({}, '-_id', cb);
}

module.exports = mongoose.model('Vungmien', vungmienSchema);