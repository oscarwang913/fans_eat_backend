const { Rating_Like } = require("../models");
const prefix = require("../utils");
const service = require("../middlewares/s3Service");

const likeControllers = {
  getLikeCount: (req, res) => {
    Rating_Like.findAll({})
      .then((result) => {
        return res.status(200).json({
          success: true,
          message: "Fetch all likes",
          result: result.length,
        });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, err });
      });
  },
  addLike: (req, res) => {
    Rating_Like.findOne({
      where: {
        UserId: req.userId,
        PostId: req.body.postId,
      },
    }).then((post) => {
      if (post) {
        return res.status(422).json({
          message: "You have liked this post",
          success: false,
        });
      }
      Rating_Like.create({
        UserId: req.userId,
        PostId: req.body.postId,
      })
        .then(() => {
          return res.json({ success: true, message: "Like!" });
        })
        .catch((err) => {
          return res.status(500).json({ success: false, err });
        });
    });
  },
};

module.exports = likeControllers;
