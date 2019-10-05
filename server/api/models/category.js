const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    child: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
    name: { type: String, default: "New Category"},
});

module.exports = mongoose.model('Category', categorySchema);