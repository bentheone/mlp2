const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const borrowingRequestRoutes = require('./routes/borrowingRequestRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrowings', borrowingRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/requests', borrowingRequestRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
