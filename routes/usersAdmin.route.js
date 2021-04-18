const userAdminControllers = require("../controllers/userAdmin.controller");
const { Router } = require("express");
const router = Router();
const verifyToken = require("../middlewares/verifyToken");
const checkIdentity = require("../middlewares/checkIdentity");

router
  .route("/")
  .get(
    verifyToken,
    checkIdentity.isUserBoardAdmin,
    userAdminControllers.getAllUsers
  )
  .patch(
    verifyToken,
    checkIdentity.isUserBoardAdmin,
    userAdminControllers.updateUserAuth
  );
router
  .route("/count")
  .get(
    verifyToken,
    checkIdentity.isUserBoardAdmin,
    userAdminControllers.getTotalUserCount
  );

module.exports = router;
