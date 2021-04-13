const postControllers = require("../controllers/post.controller");
const { Router } = require("express");
const router = Router();
const uploadService = require("../middlewares/uploadService");
const verifyToken = require("../middlewares/verifyToken");
const cors = require("cors");

router
  .route("/")
  .get(verifyToken, postControllers.getAllPosts)
  .post(
    verifyToken,
    cors(),
    uploadService.single("image"),
    postControllers.createPost
  );

router.route("/users/:id").get(verifyToken, postControllers.getAllOwnPosts);
router.route("/likes").get(verifyToken, postControllers.getLikedPost);

router
  .route("/:id")
  .get(verifyToken, postControllers.getPostById)
  .put(verifyToken, postControllers.updatePost)
  .delete(verifyToken, postControllers.deletePost);
module.exports = router;
