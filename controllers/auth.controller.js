const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../config/secretConfig");

const authControllers = {
  register: (req, res) => {
    const { fullName, userName, email, password, RoleId } = req.body;
    if (!fullName || !userName || !email || !password) {
      return res.status(422).json({ message: "Please fill all blank" });
    }
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (user) {
          return res
            .status(422)
            .json({ message: "The user with this email has already register" });
        }
        bcrypt.hash(password, saltRounds, function (err, hash) {
          User.create({
            fullName,
            userName,
            email,
            password: hash,
            RoleId,
          })
            .then((result) => {
              let token = jwt.sign(
                { id: result.id, username: result.userName },
                config.secret
              );
              return res.status(200).json({
                message: "Successfully register",
                token,
              });
            })
            .catch((err) => {
              return res.status(500).json({ message: "Some error occur", err });
            });
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Can not register at the moment", err });
      });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "Please fill your email and password" });
    }
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ message: "A user with this email could not be found" });
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (!result) {
            return res.status(401).json({ message: "Incorrect password" });
          }
          const token = jwt.sign(
            {
              email: user.email,
              id: user.id,
              username: user.userName,
            },
            config.secret
          );
          return res.status(200).json({
            message: "Successfully login",
            token,
          });
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Can not login at the moment", err });
      });
  },
  logout: (req, res) => {
    res.status(200).send({ auth: false, token: null });
  },

  getMe: (req, res, next) => {
    User.findOne({
      where: {
        id: req.userId,
      },
    })
      .then((user) => {
        console.log(user);
        if (!user) {
          return res.status(404).send("No user found");
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        return res.status(500).send("There was a problem finding the user.");
      });
  },
};

module.exports = authControllers;
