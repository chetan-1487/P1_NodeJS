import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "blogs",
  },
);

export default blog;
