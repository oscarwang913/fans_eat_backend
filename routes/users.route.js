const userControllers = require("../controllers/user.controller");
// const userValidation = require("../middlewares/validation");
const { Router } = require("express");
const router = Router();
const verifyToken = require("../middlewares/verifyToken");

router
  .route("/:id")
  .get(verifyToken, userControllers.getUserById)
  .patch(verifyToken, userControllers.updateUser);

module.exports = router;
