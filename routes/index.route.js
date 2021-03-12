const { Router } = require("express");
const posts = require("./posts.route");
const users = require("./users.route");
const router = Router();

router.use("/users", users);
router.use("/posts", posts);

router.get("/", (req, res) => res.send("This is root"));

module.exports = router;
