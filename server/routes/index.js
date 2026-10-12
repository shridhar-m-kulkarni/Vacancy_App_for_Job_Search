var express = require("express");
var router = express.Router();

const userModel = require("../public/Database/userDb");
const companyModel = require("../public/Database/companyRawData");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../Middleware/multerMiddleware")

const authenticate = require("../Middleware/authenticate");





// ===============================
// Home
// ===============================

router.get("/", function (req, res, next) {

  res.render("index", {
    title: "Express"
  });

});


// ===============================
// Create User
// ===============================

router.post("/create", async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;


    // Hash password

    const EncrptPswd = bcrypt.hashSync(
      password,
      10
    );


    // Check username

    const usernameExist = await userModel.findOne({
      username
    });

    if (usernameExist) {

      return res.send(
        "Username Already exists"
      );

    }


    // Check email

    const emailExist = await userModel.findOne({
      email
    });

    if (emailExist) {

      return res.send(
        "Email Already exists"
      );

    }


    // Create user

    await userModel.create({

      username,
      email,
      password: EncrptPswd

    });


    res.send(true);

  } catch (error) {

    res.status(500).send(
      error.message
    );

  }

});


// ===============================
// Login
// ===============================

router.post("/login", async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body;


    // Find user

    const userExist = await userModel.findOne({
      username
    });


    if (!userExist) {

      return res.send(
        "Wrong Username or Password"
      );

    }


    // Compare password

    const ComparePswd =
      bcrypt.compareSync(
        password,
        userExist.password
      );


    if (!ComparePswd) {

      return res.send(
        "Wrong Username or Password"
      );

    }


    // Create JWT

    const token = jwt.sign(

      {
        userId: userExist._id,
        username: userExist.username
      },

     process.env.JWT_SECRETE

    );


    // Send JWT in cookie

    res.cookie("token", token, {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  secure: false,
  sameSite: "lax"
});


    res.send(true);

  } catch (error) {

    res.status(500).send(
      error.message
    );

  }

});


// ===============================
// Authentication
// ===============================

router.get(
  "/Authenticate",
  authenticate,
  (req, res) => {

    res.send(true);

  }
);


// ===============================
// Logout
// ===============================

router.post("/logout", (req, res) => {

  res.clearCookie("token");

  res.send(true);

});


// ===============================
// Get Jobs
// ===============================

router.get("/jobs", async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;

        const limit = 10;

        const skip = (page - 1) * limit;

        const jobs = await companyModel
            .find()
            .skip(skip)
            .limit(limit);

        res.json(jobs);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error getting jobs"
        });

    }

});


// ===============================
// Upload Profile Picture
// ===============================

router.post(
  "/profilpic",
  authenticate,
  upload.single("profilePic"),

  async (req, res) => {

    try {

      // Check image

      if (!req.file) {

        return res
          .status(400)
          .send("Please select an image");

      }


      console.log(req.file);


      // Find logged-in user

      const selectedUser =
        await userModel.findById(
          req.user.userId
        );


      if (!selectedUser) {

        return res
          .status(404)
          .send("User not found");

      }


      // Save ONLY filename

      selectedUser.ProfilPic =
        req.file.filename;


      // Save user

      await selectedUser.save();


      res.send(true);

    } catch (error) {

      res.status(500).send(
        error.message
      );

    }

  }
);


// ===============================
// Get User + Profile Picture
// ===============================

router.get(
  "/sendPic",
  authenticate,

  async (req, res) => {

    try {

      // Find logged-in user using JWT userId

      const selectedUser =
        await userModel.findById(
          req.user.userId
        );


      if (!selectedUser) {

        return res
          .status(404)
          .send("User not found");

      }


      res.send(selectedUser);

    } catch (error) {

      res.status(500).send(
        error.message
      );

    }

  }
);


module.exports = router;