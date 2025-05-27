const Student = require("../models/student-model");
const StudentAttendance = require("../models/student-mark-attendence");
const StudentLeaveMark = require("../models/student-leave-mark");

const getStudentsData = async (req, res, next) => {
  try {
    const students = await Student.find({}, { password: 0, isAdmin: 0 });
    if (students.length <= 0) {
      return res.status(404).send("No students found");
    }
    return res.json(students);
  } catch (error) {
    next(error);
  }
};

const getStudentsAttendenceData = async (req, res, next) => {
  try {
    const studentsAttendenceData = await StudentAttendance.find();
    if (studentsAttendenceData.length <= 0) {
      return res.status(404).send("No students found");
    }
    return res.json(studentsAttendenceData);
  } catch (error) {
    next(error);
  }
};

const getStudentsLeaveData = async (req, res, next) => {
  try {
    const studentsLeaveData = await StudentLeaveMark.find();
    if (studentsLeaveData.length <= 0) {
      return res.status(404).send("No students found");
    }
    return res.json(studentsLeaveData);
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id, { password: 0, isAdmin: 0 });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    return res.json(student);
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const result = await Student.updateOne({ _id: id }, { $set: updateData });

    if (result.nModified === 0) {
      return res.status(404).send("Student not found or no changes made");
    }

    const updatedStudent = await Student.findById(id);

    return res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Student.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send("No student found");
    }

    return res.json("Student deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentsData,
  getStudentsAttendenceData,
  getStudentsLeaveData,
  deleteStudent,
  updateStudent,
  getStudentById
};
