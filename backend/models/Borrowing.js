const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowedDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned']
    },
    borrowedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Borrowing'
    }
}, {timestamps: true});

module.exports = mongoose.model('Borrowing', borrowingSchema);