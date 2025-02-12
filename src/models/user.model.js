const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: 3,
      trim: true, // Removes extra spaces
    },
    lastname: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ], // Ensures valid email format
      index: true, // Improves performance for lookups
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      select: false, // Prevents password from being returned in queries
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      min: 18, // Ensures only adults register
      max: 100, // Prevents unrealistic ages
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer not to say"],
      default: "prefer not to say",
    },
    mobile: {
      type: String,
      unique: true, // Ensures unique mobile numbers
      sparse: true, // Prevents index errors if mobile is missing
      match: [/^\d{10,15}$/, "Please enter a valid mobile number"],
    },
    address: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    pic: {
      type: String,
      default:
        "https://yourcdn.com/default-avatar.jpg", // Use your storage solution
    },
  },
  {
    timestamps: true,
  }
);

// 🔒 Hash Password Before Saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if only password is modified , the password will be hashed

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Compare Password for Authentication
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
