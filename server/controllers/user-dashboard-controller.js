const StudentAttendance = require("../models/student-mark-attendence");
const StudentLeaveMark = require("../models/student-leave-mark");

const dashboard = async (req, res) => {
  try {
    const studentId = req.userId.toString();
    const attendanceData = await StudentAttendance.find({ studentId });
    const leaveRequests = await StudentLeaveMark.find({ studentId });

    res.status(200).send({ attendanceData, leaveRequests });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { isPresent, studentId } = req.body;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existingAttendance = await StudentAttendance.findOne({
      studentId,
      date: { $gte: todayStart, $lt: todayEnd },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }

    const markAttendanceData = new StudentAttendance({
      isPresent,
      studentId,
      date: new Date(),
    });

    await markAttendanceData.save();
    res.status(201).send(markAttendanceData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const markLeave = async (req, res) => {
  try {
    const studentId = req.userId;
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLeave = await StudentLeaveMark.findOne({
      studentId,
      date: { $gte: today },
    });

    if (existingLeave) {
      return res
        .status(400)
        .json({ message: "Leave request already submitted for today" });
    }

    const newStudentLeaveMark = new StudentLeaveMark({
      name,
      email,
      phone,
      message,
      date: new Date(),
      studentId,
    });

    await newStudentLeaveMark.save();
    res.status(201).send({ message: "Leave request submitted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const viewAttendance = async (req, res) => {
  try {
    const studentId = req.userId.toString();
    const attendanceData = await StudentAttendance.find({ studentId });

    res.status(200).send(attendanceData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const userProfileData = req.user;
    res.status(200).send({ userProfileData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  dashboard,
  markAttendance,
  markLeave,
  viewAttendance,
  editProfile,
};
