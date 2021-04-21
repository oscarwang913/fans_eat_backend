const likeControllers = require("../controllers/like.controller");
const { Router } = require("express");
const router = Router();
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get(verifyToken, likeControllers.getLikeCount);
router.route("/").post(verifyToken, likeControllers.addLike);

module.exports = router;
