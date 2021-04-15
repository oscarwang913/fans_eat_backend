const postControllers = require("../controllers/post.controller");
const { Router } = require("express");
const router = Router();
const service = require("../middlewares/s3Service");
const verifyToken = require("../middlewares/verifyToken");

router
  .route("/")
  .get(verifyToken, postControllers.getAllPosts)
  .post(
    verifyToken,
    service.uploadImage().single("image"),
    postControllers.createPost
  );

router
  .route("/:id")
  .get(verifyToken, postControllers.getPostById)
  .put(verifyToken, postControllers.updatePost)
  .delete(verifyToken, postControllers.deletePost);

router
  .route("/likes")
  .get(verifyToken, postControllers.getLikedPost)
  .post(verifyToken, postControllers.addLike);

router.route("/users/:id").get(verifyToken, postControllers.getAllOwnPosts);

module.exports = router;
