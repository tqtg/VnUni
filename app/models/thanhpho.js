var mongoose = require('mongoose');

var thanhphoSchema = mongoose.Schema({
    id: Number,
    name: String,
    region: Number
})

thanhphoSchema.statics.getAll = function getAll(cb) {
	return this.find({}, cb);
}

module.exports = mongoose.model('Thanhpho', thanhphoSchema);