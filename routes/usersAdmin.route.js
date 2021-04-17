const userControllers = require("../controllers/user.controller");
const { Router } = require("express");
const router = Router();
const verifyToken = require("../middlewares/verifyToken");
const checkIdentity = require("../middlewares/checkIdentity");

router
  .route("/")
  .get(verifyToken, checkIdentity.isUserBoardAdmin, userControllers.getAllUsers)
  .patch(
    verifyToken,
    checkIdentity.isUserBoardAdmin,
    userControllers.updateUserAuth
  );

module.exports = router;
