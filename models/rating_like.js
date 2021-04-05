"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating_Like extends Model {
    static associate(models) {
      Rating_Like.belongsTo(models.User);
      Rating_Like.belongsTo(models.Post);
    }
  }
  Rating_Like.init(
    {
      UserId: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rating_Like",
    }
  );
  return Rating_Like;
};
