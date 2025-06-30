import user from "./user.js";
import blog from "./blog.js";

user.hasMany(blog, {
  foreignKey: "userId",
  as: "blogs",
});

blog.belongsTo(user, {
  foreignKey: "userId",
  as: "user",
});
