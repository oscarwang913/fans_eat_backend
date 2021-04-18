const { User } = require("../models");

function pagination(limit, page) {
  let offset = 0;
  if (page) {
    offset = (page - 1) * (limit ? parseInt(limit) : 5);
    return offset;
  }
}

const userAdminControllers = {
  getAllUsers: (req, res) => {
    const { limit, page } = req.query;
    User.findAll({
      order: [["id"]],
      limit: parseInt(limit) || 5,
      offset: parseInt(pagination(limit, page)) || 0,
    })
      .then((users) => {
        return res.status(200).json({
          success: true,
          message: "Fetch all users",
          users,
          count: users.length,
        });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, err });
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
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }
        user.update({
          RoleId: req.body.roleId,
        });
        return res.status(200).json({
          success: true,
          message: "Successfully update the user's auth",
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

module.exports = userAdminControllers;
