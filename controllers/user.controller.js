const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({
      user,
    });
  } catch (err) {
    return res.status(500).json({ err: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ err: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).json({ message: "User with this id is not exists" });
  } catch (err) {
    return res.status(500).json({ err: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedUser = await User.findOne({
        where: { id },
      });
      return res.status(200).json({ user: updatedUser });
    }
    return res.status(404).send("User not found");
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send("User deleted");
    }
    return res.status(404).send("User not found");
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
