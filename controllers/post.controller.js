const { User, Post, Rating_Like, Sequelize } = require("../models");
const prefix = require("../utils");
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
  getAllOwnPosts: (req, res) => {
    Post.findAll({
      where: {
        UserId: req.userId,
      },
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
          message: "Successfully fetch all your posts",
          posts: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, err });
      });
  },
  getPostById: (req, res) => {
    const { id } = req.params;
    Post.findOne({
      where: { id },
      attributes: [
        "id",
        "content",
        "image",
        "createdAt",
        [Sequelize.fn("COUNT", Sequelize.col("rating_likes.PostId")), "Total"],
      ],
      include: [
        {
          model: Rating_Like,
          required: false,
          attributes: [],
        },
        {
          model: User,
          required: false,
          attributes: ["id", "userName"],
        },
      ],
      group: ["Post.id"],
    })
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: "Post with this id is not exists",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Successfully fetch the post",
          post: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, err });
      });
  },
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

  getOwnLikedPost: (req, res) => {
    Rating_Like.findAndCountAll({
      where: {
        UserId: req.userId,
      },
      include: [
        {
          model: Post,
          required: false,
          attributes: ["id", "content", "image"],
        },
        {
          model: User,
          required: false,
          attributes: ["id", "userName"],
        },
      ],
    })
      .then((result) => {
        if (!result) {
          return res
            .status(404)
            .json({ success: false, message: "Posts are not exists" });
        }
        return res.status(200).json({
          success: true,
          message: "Successfully fetch liked posts",
          posts: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, err });
      });
  },

  createPost: (req, res) => {
    const { content } = req.body;
    const { file } = req;
    if (!content) {
      return res.status(422).json({ message: "Please fill content" });
    }
    Post.create({
      content: content,
      image: `https://img-upload-storage.s3.amazonaws.com/${prefix}_${file.originalname}`,
      UserId: req.userId,
    })
      .then((result) => {
        return res.status(201).json({
          success: true,
          message: "Successfully create a post",
          post: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, err: err });
      });
  },
  updatePost: (req, res) => {
    if (!req.body.content) {
      return res.status(422).json({ message: "Please fill the content" });
    }
    Post.findOne({
      where: {
        id: req.params.id,
        UserId: req.userId,
      },
    })
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            success: false,
            message: "Post with this id is not exists",
          });
        }
        post.update({
          content: req.body.content,
        });
        return res.status(200).json({
          success: true,
          message: "Successfully update the post",
          post,
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

module.exports = postControllers;
