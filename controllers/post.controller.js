const { User, Post, Rating_Like, Sequelize } = require("../models");
const env = require("../config/s3.env");
const service = require("../middlewares/s3Service");
const prefix = require("../utils");

const postControllers = {
  getAllPosts: (req, res) => {
    Post.findAll({
      attributes: [
        "id",
        "content",
        "imagePath",
        "postStatus",
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
          return res.status(404).json({ message: "Posts are not exists" });
        }
        return res
          .status(200)
          .json({ message: "Successfully fetch all posts", posts: result });
      })
      .catch((err) => {
        return res.status(500).json({ err });
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
        "imagePath",
        "postStatus",
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
          return res.status(404).json({ message: "Posts are not exists" });
        }
        return res.status(200).json({
          message: "Successfully fetch all your posts",
          posts: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });
  },
  getPostById: (req, res) => {
    const { id } = req.params;
    Post.findOne({
      where: { id },
      attributes: [
        "id",
        "content",
        "imagePath",
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
          return res
            .status(404)
            .json({ message: "Post with this id is not exists" });
        }
        return res
          .status(200)
          .json({ message: "Successfully fetch the post", post: result });
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });
  },
  createPost: (req, res) => {
    if (!req.body.content || !req.file) {
      return res
        .status(422)
        .json({ message: "Please fill the content or invalid file type" });
    }

    // put the userid which is in the isAuth into the UserId for connecting post and verified user
    Post.create({
      content: req.body.content,
      imagePath: `https://${env.Bucket}.s3.amazonaws.com/${prefix}_${req.file.originalname}`,
      UserId: req.userId,
    })
      .then((result) => {
        return res.status(201).json({
          message: "Successfully create a post",
          post: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({ err: err });
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
          return res
            .status(404)
            .json({ message: "Post with this id is not exists" });
        }
        post.update({
          content: req.body.content,
        });
        return res
          .status(200)
          .json({ message: "Successfully update the post", post });
      })
      .catch((err) => {
        return res.status(500).json({ err });
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
          res.status(200).json({ message: "Successfully delete the post" });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = postControllers;
