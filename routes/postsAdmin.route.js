const postControllers = require("../controllers/post.controller");
const { Router } = require("express");
const router = Router();
const verifyToken = require("../middlewares/verifyToken");
const checkIdentity = require("../middlewares/checkIdentity");

router
  .route("/")
  .get(
    verifyToken,
    checkIdentity.isPostBoardAdmin,
    postControllers.getAllPosts
  );

router
  .route("/:id")
  .put(verifyToken, checkIdentity.isPostBoardAdmin, postControllers.updatePost)
  .delete(
    verifyToken,
    checkIdentity.isPostBoardAdmin,
    postControllers.deletePost
  );
module.exports = router;
