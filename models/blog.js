const {DataTypes} = require("sequelize")
const sequelize = require("./index")

const Blog = sequelize.define(
    "Blog",
    {
        title:{
                type: DataTypes.STRING,
            },
        description: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "blogs",
    }
);

module.exports= Blog;