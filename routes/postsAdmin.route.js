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
  .delete(
    verifyToken,
    checkIdentity.isPostBoardAdmin,
    postControllers.deletePost
  );
module.exports = router;
