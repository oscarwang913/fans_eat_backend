const userControllers = require("../controllers/user.controller");
// const userValidation = require("../middlewares/validation");
const { Router } = require("express");
const router = Router();

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router
  .route("/:id")
  .get(userControllers.getUserById)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
