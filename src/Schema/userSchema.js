const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
