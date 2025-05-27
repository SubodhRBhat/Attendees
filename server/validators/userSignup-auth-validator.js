const { z } = require("zod");

const userSignupSchema = z.object({
  name: z.string().trim().min(5, "Name must be at least 5 characters"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(11, "Phone must be at least 11 characters")
    .max(13, "Phone cannot be more than 13 characters"),
  address: z.string().min(1, "Address is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  isAdmin: z.boolean(),
});

module.exports = userSignupSchema;
