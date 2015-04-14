var mongoose = require('mongoose');

var nganhhocSchema = mongoose.Schema({
	id: String,
    name: String
})

nganhhocSchema.statics.getAll = function getAll(cb) {
	return this.find({ $query: {}, $orderby: { id : 1 }}, '-_id', cb);
}

module.exports = mongoose.model('Nganhhoc', nganhhocSchema);