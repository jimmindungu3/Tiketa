const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// Define userSchema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter full name"],
    minlength: [4, "Full name must be 4 characters or more"],
    uppercase: true
  },
  email: {
    type: String,
    unique: [true, "This email already in use"],
    required: [true, "Please enter email address"],
    validate: [isEmail, "Please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be 6 characters or more"]
  },
});

// fire a function before saving user to db
// function takes current password, hashes it and puts it back to the userObject before its saved to db
// function calls next method to pass execution to nex middleware in line
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
