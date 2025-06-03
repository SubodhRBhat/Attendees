require("dotenv").config();
const express = require("express");
const app = express();
const userAuthRoute = require("./router/user-auth-route");
const userDashboardRoute = require("./router/user-dashboard-route");
const adminRoute = require("./router/admin-route");
const connectDB = require("./utils/db");
const cors = require("cors");
const errorMiddleware = require("./middlewares/auth-error-middleware");

const Student = require("./models/student-model");
const bcrypt = require("bcryptjs");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", userAuthRoute);
app.use("/user", userDashboardRoute);
app.use("/admin", adminRoute);
app.use(errorMiddleware);

const PORT = 5000;

// ✅ Create default admin
const createDefaultAdmin = async () => {
  const adminEmail = "admin@gmail.com";

  try {
    const existingAdmin = await Student.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const admin = new Student({
        name: "Admin",
        email: adminEmail,
        phone: "9999999999",
        address: "Admin Office",
        password: hashedPassword,
        isAdmin: true,
      });

      await admin.save();
      console.log("✅ Default admin created");
    } else {
      console.log("ℹ️ Default admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error.message);
  }
};

// ✅ Connect DB, then run server and create admin
connectDB().then(() => {
  createDefaultAdmin(); // 👈 Add this line
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
