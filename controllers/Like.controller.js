const { Rating_Like } = require("../models");

const likeControllers = {
  addLike: (req, res) => {
    Rating_Like.create({
      UserId: req.userId,
      PostId: req.body.postId,
    })
      .then(() => {
        return res.send("Like!");
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });
  },
};

module.exports = likeControllers;
