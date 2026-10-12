// ===============================
// Multer Configuration
// ===============================

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

  // Where image will be stored
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  // Give uploaded file a name
  filename: (req, file, cb) => {

    const extension = path.extname(file.originalname);

    const filename = Date.now() + extension;

    cb(null, filename);
  }

});

const upload = multer({
  storage: storage
});

module.exports = upload;