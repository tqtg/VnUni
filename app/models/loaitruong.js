var mongoose = require('mongoose');

var loaitruongSchema = mongoose.Schema({
    id: Number,
    name: String
})

loaitruongSchema.statics.getAll = function getAll(cb) {
	return this.find({}, cb);
}

module.exports = mongoose.model('Loaitruong', loaitruongSchema);