import Blog from "../models/blog.js";

export const blogsDetails = async (req) => {
  try {
    let data = await Blog.findAll({});
    return data;
  } catch (err) {
    return err;
  }
};

export const blogCreate = async (req) => {
  try {
    const { title, description } = req.body;
    let createData = req.body;
    let data;

    if (createData.length > 1) {
      data = await Blog.bulkCreate({
        title,
        description,
        userId: req.user.id,
      });
    } else {
      data = await Blog.create({
        title,
        description,
        userId: req.user.id,
      });
    }
    return data;
  } catch (err) {
    return err;
  }
};

export const blogDelete = async (req) => {
  try {
    let blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) {
      return { msg: "Blog doesnot exist" };
    }
    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    return req.params.id;
  } catch (err) {
    return err;
  }
};

export const blogUpdate = async (req) => {
  try {
    const blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) {
      return { msg: "Blog does not exist" };
    }

    const newData = req.body;
    const [updated] = await Blog.update(newData, {
      where: { id: req.params.id },
    });

    if (updated === 0) {
      return { msg: "No changes made or invalid data" };
    }

    const updatedBlog = await Blog.findOne({ where: { id: req.params.id } });
    return { msg: "Blog updated successfully", blog: updatedBlog };
  } catch (err) {
    console.error("Blog update error:", err);
    return { msg: err.message || "Internal server error" };
  }
};

