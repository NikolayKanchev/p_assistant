const mongoose = require('mongoose');

const childSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    birthdate: { type: String, required: true },
    gender: { type: String, required: true},
    clothesSize: { type: Number },
    shoeSize: { type: Number },
    img: { type: String }
});

module.exports = mongoose.model('Child', childSchema);