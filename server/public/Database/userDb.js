require("dotenv").config();
const mongoose = require("mongoose");


// Connect MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });


// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  ProfilPic: {
    type: String,
  }
});


// User Model
const userModel = mongoose.model("User", userSchema);


module.exports = userModel;