require("dotenv").config();
const express = require("express");
const app = express();
const userAuthRoute = require("./router/user-auth-route");
const userDashboardRoute = require("./router/user-dashboard-route");
const adminRoute = require("./router/admin-route");
const connectDB = require("./utils/db");
const cors = require("cors");
const errorMiddleware = require("./middlewares/auth-error-middleware");

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

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
