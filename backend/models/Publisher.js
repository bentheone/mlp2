const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    publishedBooks:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book'
        }
    ],

}, {timestamps: true});

module.exports = mongoose.model('Publisher', publisherSchema);