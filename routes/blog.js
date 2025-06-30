import express from "express";
const router = express.Router();
import {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog-controller.js";
import { authenticate, authorize } from "../middlewares/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   title: Blogs
 *   description: Blog management APIs
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blog posts
 */
router.get("/blogs", authenticate, getBlogs);

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created
 */
router.post("/blog", authenticate, createBlog);

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete blog post
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted
 */
router.delete("/blog/:id", authenticate, authorize("admin"), deleteBlog);

/**
 * @swagger
 * /blog/{id}:
 *   patch:
 *     summary: Update blog post
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated
 */
router.patch("/blog/:id", authenticate, authorize("admin"), updateBlog);

export default router;
