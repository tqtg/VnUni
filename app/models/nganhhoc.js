var mongoose = require('mongoose');

var nganhhocSchema = mongoose.Schema({
	id: Number,
    name: String
})

nganhhocSchema.statics.getAll = function getAll(cb) {
	return this.find({}).exec(cb);
}

module.exports = mongoose.model('Nganhhoc', nganhhocSchema);