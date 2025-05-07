const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = Supplier.find();
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({message: 'Internal server error'});
        console.error('Error!', err);
    }
};

exports.storeSupplier = async (req, res) => {
    try {
        const { name } = req.body;
        const newSupplier = Supplier.create({name});

        res.status(200).json(newSupplier);

    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
    }
}
exports.updateSupplier = async (req, res) => {
    try {
        const supplier = Supplier.findById(req.params.id);
        const { name, psuppliedBooks } = req.body;
        if(!supplier) return res.status(404).json({message: 'Supplier not found'});
        const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
        console.error('Update error!',err);
    }
}

exports.deleteSupplier = async (req,res) => {
    const supplier = Supplier.findById(req.params.id);
    if(!supplier) return res.sstatus(404).json({message: 'Supplier not found!'});
    supplier.remove();
    res.status(200).json({messgae: 'Supplier deleted successfully!'});
};