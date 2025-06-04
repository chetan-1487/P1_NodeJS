const User=require("./user");
const Blog=require("./blog")


User.hasMany(Blog, {
  foreignKey: "user_id",
  as: "blogs",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
