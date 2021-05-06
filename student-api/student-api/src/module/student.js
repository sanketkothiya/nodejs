const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 10
    },
    email: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please enter a valid email address');
            }
        }
    },
    Mo_num: {
        type: Number,
        unique: true,
        minLength: 10,
    },
    address: {
        type: String,
        minLength: 2
    },
    join_date: {
        type: Date,
        default: Date.now()
    }
});

const Student = new mongoose.model('student', studentSchema);

module.exports = Student;