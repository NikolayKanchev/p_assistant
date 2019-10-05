const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, default: "New Item"},
    size: { type: Number },
    price: { type: Number },
    img: { type: String }
});

module.exports = mongoose.model('Item', categorySchema);