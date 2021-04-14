const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const env = require("../config/s3.env");
const prefix = require("../utils");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const service = {
  uploadImage: () => {
    const upload = multer({
      storage: multerS3({
        s3,
        acl: "public-read",
        bucket: process.env.Bucket,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          cb(null, `${prefix}_${file.originalname}`);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 2 },
      fileFilter,
    });
    return upload;
  },
  deleteImage: (fileName, cb) => {
    const params = {
      Bucket: process.env.Bucket,
      Delete: {
        Objects: [
          {
            Key: fileName,
          },
        ],
      },
    };
    s3.deleteObjects(params, function (err, data) {
      if (err) {
        return cb({ error: err });
      }
      cb({ data });
    });
  },
};

module.exports = service;
