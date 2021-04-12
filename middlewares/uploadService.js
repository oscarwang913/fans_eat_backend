const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(null, false);
    return cb(new Error("Please upload an image"));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  dest: "temp/",
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});

module.exports = upload;
