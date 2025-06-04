const {DataTypes} = require("sequelize")
const sequelize = require("../db")

const Blog = sequelize.define(
    "Blog",
    {
        title:{
                type: DataTypes.STRING,
            },
        description: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users", // matches table name of User model
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        tableName: "blogs",
    }
);

module.exports= Blog;