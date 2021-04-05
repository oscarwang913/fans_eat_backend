const authControllers = require("../controllers/auth.controller");
const { Router } = require("express");
const router = Router();

const verifyToken = require("../middlewares/verifyToken");

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/logout").post(authControllers.logout);
router.route("/me").get(verifyToken, authControllers.getMe);

module.exports = router;
