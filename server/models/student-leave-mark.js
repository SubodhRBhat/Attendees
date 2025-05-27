const { Schema, model } = require('mongoose');

const studentLeaveSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    studentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    }
});

const StudentLeaveMark = model('StudentLeaveMark', studentLeaveSchema);
module.exports = StudentLeaveMark;
