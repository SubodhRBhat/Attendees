const jwt = require("jsonwebtoken");
const Student = require("../models/student-model");

const userProfileMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization Denied" });
  }

  const jwt_token = token.replace("Bearer ", "").trim();

  try {
    const isVerified = jwt.verify(jwt_token, process.env.JWT_SECRET);

    const studentProfileData = await Student.findOne({
      email: isVerified.email,
    }).select({ password: 0 });
    if (!studentProfileData) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = studentProfileData;
    req.token = token;
    req.userId = studentProfileData._id.toString();

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token verification failed" });
  }
};

module.exports = userProfileMiddleware;
