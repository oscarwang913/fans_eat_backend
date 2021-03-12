const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const env = require("../config/s3.env");
const prefix = require("../utils");

aws.config.update({
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.REGION,
});

const s3 = new aws.S3();

const service = {
  uploadImage: () => {
    const upload = multer({
      storage: multerS3({
        s3,
        acl: "public-read",
        bucket: env.Bucket,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          cb(null, `${prefix}_${file.originalname}`);
        },
      }),
    });
    return upload;
  },
  deleteImage: (fileName, cb) => {
    const params = {
      Bucket: env.Bucket,
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
