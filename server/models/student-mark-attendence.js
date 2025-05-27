const { Schema, model } = require('mongoose');

const studentAttendanceSchema = new Schema({
    isPresent: {
        type: Boolean,
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

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);

module.exports = StudentAttendance;
