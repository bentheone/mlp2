const mongoose = require('mongoose');
const connectDB = async () => {
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Mongo connection error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;