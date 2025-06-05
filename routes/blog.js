import express from 'express';
const router = express.Router();
import {getBlogs, createBlog, deleteBlog, updateBlog,} from '../controllers/blog-controller.js';
import { authenticate, authorize } from '../middlewares/auth-middleware.js';


router.get("/blogs", authenticate, getBlogs)
router.post("/blog", authenticate, createBlog)
router.delete("/blog/:id", authenticate, authorize('admin'), deleteBlog)
router.patch("/blog/:id", authenticate, authorize('admin'), updateBlog)

export default  router ;
