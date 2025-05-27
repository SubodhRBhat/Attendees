const { z } = require("zod");

const userSignupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

module.exports = userSignupSchema;
