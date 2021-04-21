const { User, Post, Rating_Like, Sequelize } = require("../models");
const service = require("../middlewares/s3Service");

function pagination(limit, page) {
  let offset = 0;
  if (page) {
    offset = (page - 1) * (limit ? parseInt(limit) : 12);
    return offset;
  }
}

const postControllers = {
  getAllPosts: (req, res) => {
    const { limit, page } = req.query;
    Post.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit) || 12,
      offset: parseInt(pagination(limit, page)) || 0,
      attributes: [
        "id",
        "content",
        "image",
        "postStatus",
        "createdAt",
        [Sequelize.fn("COUNT", Sequelize.col("rating_likes.PostId")), "Total"],
      ],
      include: [
        {
          model: Rating_Like,
          required: false,
          attributes: [],
          duplicating: false,
        },
        {
          model: User,
          required: false,
          attributes: ["id", "userName"],
          duplicating: false,
        },
      ],
      group: ["Post.id"],
    })
      .then((result) => {
        if (!result) {
          return res
            .status(404)
            .json({ success: false, message: "Posts are not exists" });
        }
        return res.status(200).json({
          success: true,
          message: "Successfully fetch all posts",
          posts: result.rows,
          count: result.count.length,
        });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, err });
      });
  },
  deletePost: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
        UserId: req.userId,
      },
    })
      .then((post) => {
        const imagePathName = post.imagePath.split("/").pop();
        service.deleteImage(imagePathName, (err) => {
          if (err) {
            console.log(err);
          }
        });
        post.destroy().then(() => {
          res
            .status(200)
            .json({ success: true, message: "Successfully delete the post" });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = postControllers;
