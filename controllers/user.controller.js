const { User } = require("../models");

const userControllers = {
  getAllUsers: (req, res) => {
    User.findAll({})
      .then((users) => {
        return res.status(200).json({ message: "Fetch all users", users });
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });
  },
  getUserById: (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found");
        }
        return res.status(200).json({ message: "Fetch the user", user });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Can not fetch the user at the moment", err });
      });
  },
  updateUserAuth: (req, res) => {
    User.findOne({
      where: {
        id: req.body.id,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found");
        }
        user.update({
          RoleId: req.body.roleId,
        });
        return res
          .status(200)
          .json({ message: "Successfully update the user's auth" });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Can not update user at the moment" });
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
          return res.status(404).send("User not found");
        }
        user.update({
          userName: req.body.userName,
        });
        return res
          .status(200)
          .json({ message: "Successfully update the user's name" });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Can not update user at the moment" });
      });
  },
  deleteUser: (req, res) => {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        return res.status(204).send("User deleted");
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  },
};

module.exports = userControllers;
