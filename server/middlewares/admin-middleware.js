const adminMiddleware = (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied, you are not an admin" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
