require("dotenv").config();

const mongoose = require("mongoose");





// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });


// Company Schema
const companySchema = new mongoose.Schema({

  id: {
    type: Number,
    required: true,
    unique: true
  },

  companyName: {
    type: String,
    required: true
  },

  jobTitle: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  salary: {
    type: String,
    required: true
  },

  jobType: {
    type: String,
    required: true
  },

  experience: {
    type: String,
    required: true
  },

  skills: {
    type: [String],
    required: true
  },

  remote: {
    type: Boolean,
    required: true
  }

});



module.exports = mongoose.model("jobs", companySchema);





