const { User, Role } = require("../models");

const checkIdentity = {
  isUserBoardAdmin: (req, res, next) => {
    // the value of required is false for left join
    User.findOne({
      where: {
        id: req.userId,
      },
      include: Role,
      required: false,
    }).then((User) => {
      if (User.Role.role_Name !== "admin1") {
        res.status(403).json({ message: "Are you verified admin?" });
      }
      next();
    });
  },
  isPostBoardAdmin: (req, res, next) => {
    User.findOne({
      where: {
        id: req.userId,
      },
      include: Role,
      required: false,
    }).then((User) => {
      if (User.Role.role_Name !== "admin2") {
        res.status(403).json({ message: "Are you verified admin?" });
      }
      next();
    });
  },
  isBannedUser: (req, res, next) => {
    User.findOne({
      where: {
        id: req.userId,
      },
      include: Role,
      required: false,
    }).then((User) => {
      if (User.Role.role_Name !== "banned_User") {
        next();
      }
      return res.status(403).json({ message: "You are currently banned" });
    });
  },
};

module.exports = checkIdentity;
