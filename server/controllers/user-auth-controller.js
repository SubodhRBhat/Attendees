const Student = require('../models/student-model');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const { name, email, password, phone, address, isAdmin } = req.body;

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin,
        });
        await newStudent.save();

        const token = newStudent.generateToken();

        res.status(201).json({
            message: 'User successfully registered',
            newStudent,
            token,
            userid: newStudent._id.toString(),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).send("Incorrect password");
        }

        res.status(201).json({
            message: 'User successfully logged in',
            token: student.generateToken(),
            userid: student._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { signup, signin };
