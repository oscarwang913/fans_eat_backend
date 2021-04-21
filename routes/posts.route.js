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

router.route("/all/:id").get(verifyToken, postControllers.getAllOwnPosts);
router.route("/count").get(verifyToken, postControllers.getTotalPostCount);
router.route("/likes").get(verifyToken, postControllers.getOwnLikedPost);

router
  .route("/:id")
  .get(verifyToken, postControllers.getPostById)
  .put(verifyToken, postControllers.updatePost);

module.exports = router;
