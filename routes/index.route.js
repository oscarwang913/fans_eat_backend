const { Router } = require("express");
const posts = require("./posts.route");
const users = require("./users.route");
const auth = require("./auth.route");
const like = require("./like.route");
const usersAdmin = require("./usersAdmin.route");
const postsAdmin = require("./postsAdmin.route");
const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/posts", posts);
router.use("/likes", like);
router.use("/admin/users", usersAdmin);
router.use("/admin/posts", postsAdmin);

router.get("/", (req, res) => res.send("This is root"));

module.exports = router;
