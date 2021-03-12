const postControllers = require("../controllers/post.controller");
const { Router } = require("express");
const router = Router();
const service = require("../middlewares/s3Service");

router
  .route("/")
  .get(postControllers.getAllPosts)
  .post(service.uploadImage().single("imagePath"), postControllers.createPost);

router
  .route("/:id")
  .get(postControllers.getPostById)
  // .put(postControllers.updatePost)
  .delete(postControllers.deletePost);

module.exports = router;
