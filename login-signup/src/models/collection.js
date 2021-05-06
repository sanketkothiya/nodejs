const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const regDetailsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            validator.isEmail(value);
        }
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Generating tokens
regDetailsSchema.methods.generateAuthToken = async function() {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (e) {
        res.send(e);
        console.log(e);
    }
}

regDetailsSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        // this.cpassword = undefined;
    }
})

const Collection = mongoose.model('detail', regDetailsSchema);

module.exports = Collection;

// const createToken = async() => {
//     const token = await jwt.sign({ _id: '607fbd033218966e0c88e8fe' }, 'helloandwelcometoourportalyouareusingourfacility', {
//         expiresIn: '5 seconds'
//     });
//     console.log(token);

//     const userVerifying = await jwt.verify(token, 'helloandwelcometoourportalyouareusingourfacility');
//     console.log(userVerifying);
// }