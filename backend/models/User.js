const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists!'],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    
    role: {
        type: String,
        enum: ['librarian', 'member', 'admin'],
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    district: {
        type: String,
        enum: [
            "Gasabo", "Kicukiro", "Nyarugenge", "Bugesera", "Gatsibo", "Kayonza", "Kirehe",
            "Ngoma", "Nyagatare", "Rwamagana", "Gicumbi", "Rulindo", "Burera", "Musanze",
            "Gakenke", "Nyabihu", "Rubavu", "Ngororero", "Rutsiro", "Karongi", "Nyamasheke",
            "Rusizi", "Huye", "Gisagara", "Nyanza", "Nyamagabe", "Nyaruguru", "Muhanga",
            "Kamonyi", "Ruhango"
          ],
          required: true
    },
    borrowedBooks: [
        {
            bookId :{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            },
            borrowDate: {
                type: Date
            },
            returnDate: {
                type: Date
            } 
        }
    ]

    
},
 {timestamps: true});

 userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
 });

 userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
 };

 module.exports = mongoose.model('User', userSchema);