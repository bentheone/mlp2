const Borrowing = require('../models/Borrowing');
const User = require('../models/User');

exports.getAllBorrowings = async (req, res) => {
    try {
        const borrowings = await Borrowing.find();
        res.status(200).json(borrowings);
    } catch(err) {
        res.status(500).json({message: "Internal server error!"});
        console.error('Error getting all borrowings', err);
    }
};

exports.storeBorrowing = async (req, res) => {
    try {
        const {bookId, borrowedDate, borrowedBy, status} = req.body;

        const newBorrowing = await Borrowing.create({
            userId: req.user._id,
            bookId,
            borrowedDate,
            borrowedBy,
            status
        });
        
        const user = User.findById(userId);
        if(!user) return res.satus(404).json({message: 'User not found!'});
        user.borrowedBooks.push({
            bookId,
            userId: req.user._id,
            borrowedDate
        });
        await user.save();

        res.status(201).json(newBorrowing);
    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
        console.log('Insert error', err);
    }
};

exports.updateBorrowing = async(req, res) => {
    try {
        const borrowing = await Borrowing.findById(req.params.id);
        const {
            bookId,
            borrowDate,
            returnDate,
            status
        } = req.body;
        if(!borrowing) return res.status(404).json({message: 'Borrowing not found!'});

        const updated = await Borrowing.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        const user = User.findById(userId);
        if(!user) return res.status(404).json({message: 'User not found!'});
        const bookEntry = user.borrowedBooks.find(b => b.bookId.toString() === bookId);

        if(!bookEntry) return res.status(404).json({messgae: 'Borrowed book not found!'});
        bookEntry.returnDate = returnDate;

        await user.save();


        res.status(200).json(updated);

    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
        console.log('Update error!', err);
    }
};

exports.deleteBorrowing = async (req, res) => {
    const borrowing = await Borrowing.findById(req.params.id);
    if(!books) return res.status(404).json({message: 'Book not found!'});
    book.remove();
    res.status(200).json({message: "Borrowing deleted successfully!"});
}