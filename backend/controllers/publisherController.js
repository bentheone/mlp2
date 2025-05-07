const Publisher = require('../models/Publisher');

exports.getAllPublishers = async (req, res) => {
    try {
        const publishers = Publisher.find();
        res.status(200).json(publishers);
    } catch (err) {
        res.status(500).json({message: 'Internal server error'});
        console.error('Error!', err);
    }
};

exports.storePublisher = async (req, res) => {
    try {
        const { name } = req.body;
        const newPublisher = Publisher.create({name});

        res.status(200).json(newPublisher);

    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
    }
}
exports.updatePublisher = async (req, res) => {
    try {
        const publisher = Publisher.findById(req.params.id);
        const { name, publishedBooks } = req.body;
        if(!publisher) return res.status(404).json({message: 'Publisher not found'});
        const updated = await Publisher.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
        console.error('Update error!',err);
    }
}

exports.deletePublisher = async (req,res) => {
    const publisher = Publisher.findById(req.params.id);
    if(!publisher) return res.sstatus(404).json({message: 'Publisher not found!'});
    publisher.remove();
    res.status(200).json({messgae: 'Supplier deleted successfully!'});
};