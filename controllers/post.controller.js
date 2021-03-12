const { Post } = require("../models");
const env = require("../config/s3.env");
const service = require("../middlewares/s3Service");
const prefix = require("../utils");

const postControllers = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({});
      if (posts) {
        return res
          .status(200)
          .json({ message: "Successfully fetch all posts", posts });
      }
      return res.status(404).json({ message: "Posts are not exists" });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findOne({
        where: { id },
      });
      if (post) {
        return res
          .status(200)
          .json({ message: "Successfully fetch the post", post });
      }
      return res
        .status(404)
        .json({ message: "Post with this id is not exists" });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  createPost: async (req, res) => {
    const content = req.body.content;
    const likeCount = req.body.likeCount;
    const UserId = req.body.UserId;
    const imagePath = `https://${env.Bucket}.s3.amazonaws.com/${prefix}_${req.file.originalname}`;

    try {
      const post = await Post.create({
        content,
        likeCount,
        imagePath,
        UserId,
      });
      return res.status(201).json({
        message: "Successfully create a post",
        post,
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  // updatePost: async (req, res) => {},
  deletePost: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((post) => {
        const imagePathName = post.imagePath.split("/").pop();
        console.log(imagePathName);
        service.deleteImage(imagePathName, (err) => {
          if (err) {
            console.log(err);
          }
        });
        return post.destroy();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = postControllers;
