const BorrowingRequest = require('../models/BorrowRequest');

exports.getAllRequests = async(req, res) => {
    try {
        const requests = await BorrowingRequest.find();

        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
        console.error('Get all requers error!', err);
    }
};

exports.storeRequest = async (req, res) => {
    try{
    const {userId, bookId } = req.body;
    const newRequest = await BorrowingRequest.create({
        userId,
        bookId,
        status: 'Pending'
    });

    res.status(200).json(newRequest);
    } catch(err) {
        res.status(500).json({message: "Internal server error!"});
        console.error('Adding request error', err);
    }
};

exports.updateRequest = async (req, res) => {
    const request = BorrowingRequest.findById(req.params.id);
    const {bookId, status} = req.body;

    if(!request) return res.status(404).json({message: 'request not found!'});

    const updated = BorrowingRequest.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
};

exports.deleteRequest = async (req, res) => {
    const request = BorrowingRequest.findById(req.params.id);
    if(!request) return res.status(404).json({message: 'Borrowing request not found!'});
    await request.remove();
    res.status(200).json({message: 'Request deleted successfully'});
}