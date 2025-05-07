const Book = require('../models/Book');
const Publisher = require('../models/Publisher');
const Supplier = require('../models/Supplier');

exports.getAllBooks = (req, res) => {
    try {
        const books = Book.find();
        res.status(200).json(books);
    }catch(err) {
        res.status(500).json({message: 'Internal Server Error!'});
        console.log('Error!', err);
    }
};

exports.storeBook = async (req, res) => {
    try {
        const {title, publicationDate, description, availableCopies, publisherId, supplierId, } = req.body;

        const newBook = await Book.create({
            title,
            publicationDate,
            description, 
            availableCopies,
            publisherId,
            supplierId,
            userId: req.user._id
        });

        const publisher = Publisher.findById(publisherId);
        if(!publisher) return res.status(404).json({message: 'Publisher not found!'});
        publisher.publishedBooks.push(newBook._id);
        publisher.save();

        const supplier = Supplier.findById(supplierId);
        if(!supplier) return res.status(404).json({message: 'Supplier not found!'});
        suppler.save();


        res.status(200).json(newBook);      

    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
        console.log('Insert error', err);
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        const { title, publicationDate, description, availableCopies, publisherId, supplierId } = req.body;

        if(!book) return res.status(404).json({message: 'Book not found!'});

        const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({message: 'Internal server error'});
        console.log('Update Error!', err);
    }
};

exports.deleteBook = async(req, res) => {
    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).json({message: 'Book not found'});

    await book.remove();
    res.status(200).json({message: "Product deleted successfully!"});
}
