const { User } = require("../models");

const userControllers = {
  getUserById: (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }
        return res
          .status(200)
          .json({ success: true, message: "Fetch the user", user });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Can not fetch the user at the moment",
          err,
        });
      });
  },
  updateUser: (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not updated" });
        }
        user.update({
          fullName: req.body.fullName,
          userName: req.body.userName,
          email: req.body.email,
        });
        return res.status(200).json({
          success: true,
          message: "Successfully update the user's name",
          user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Can not update user at the moment",
        });
      });
  },
};

module.exports = userControllers;
