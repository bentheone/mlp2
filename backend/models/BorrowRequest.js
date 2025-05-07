const mongoose = require('mongoose');
const borrowRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    },
    status: {
        type: String,
        enum: ['Pending','Accpted', 'Denied']
    }

});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);