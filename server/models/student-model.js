const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


studentSchema.methods.generateToken = function(){
    try {
        return jwt.sign({
            _id: this._id.toString(),
            email:this.email,
            isAdmin: this.isAdmin
        },
    process.env.JWT_SECRET,
    {expiresIn:'1d'}
    )
        
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}


const Student = model('Student', studentSchema);
module.exports = Student;
