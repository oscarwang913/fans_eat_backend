const postAdminControllers = require("../controllers/postAdmin.controller");
const { Router } = require("express");
const router = Router();
const verifyToken = require("../middlewares/verifyToken");
const checkIdentity = require("../middlewares/checkIdentity");

router
  .route("/")
  .get(
    verifyToken,
    checkIdentity.isPostBoardAdmin,
    postAdminControllers.getAllPosts
  );

router
  .route("/:id")
  .delete(
    verifyToken,
    checkIdentity.isPostBoardAdmin,
    postAdminControllers.deletePost
  );
module.exports = router;
