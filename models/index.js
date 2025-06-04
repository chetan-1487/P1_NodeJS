import user from './user.js';
import blog from './blog.js';

user.hasMany(blog, {
  foreignKey: "user_id",
  as: "blogs",
});

blog.belongsTo(user, {
  foreignKey: "user_id",
  as: "user",
});
