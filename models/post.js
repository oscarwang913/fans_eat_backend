"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User);
      Post.hasMany(models.Rating_Like);
    }
  }
  Post.init(
    {
      content: DataTypes.TEXT,
      imagePath: DataTypes.STRING,
      postStatus: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
