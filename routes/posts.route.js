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

router.route("/users/:id").get(verifyToken, postControllers.getAllOwnPosts);
router.route("/count").get(verifyToken, postControllers.getTotalPostCount);
router.route("/likes/all").get(verifyToken, postControllers.getLikeCount);
router
  .route("/likes")
  .get(verifyToken, postControllers.getOwnLikedPost)
  .post(verifyToken, postControllers.addLike);

router
  .route("/:id")
  .get(verifyToken, postControllers.getPostById)
  .put(verifyToken, postControllers.updatePost);

module.exports = router;
